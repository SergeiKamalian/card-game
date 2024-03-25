import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { TCard, TGame, TGamer, TGamerStatus } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS, GAMERS_TIMES, GAMER_STATUSES } from "../constants";
import { useUserContext } from "../contexts";
import {
  checkAttackerCard,
  checkDefenderCard,
  recognizeAttackerAndDefenderOnFinishLap,
  recognizeAttackerOnTransferPlace,
  removeCardFromDeck,
  updateGamersOnFinishLap,
} from "../utils";
import { useFirebase } from "./useFirebase";
import { useTimer } from "./useTimer";
import { RootState, selectDefenderCard, unselectDefenderCard } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "../ui";
import { getDatabase, ref, onValue, get, set } from "firebase/database";

export const useGame = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useUserContext();

  const defenderSelectedCard = useSelector(
    (store: RootState) => store.gameReducer.defenderSelectedCard
  );

  const { getGameUpdatedTimes } = useTimer();

  const { changeData, getData } = useFirebase();

  const [game, setGame] = useState<TGame | null>(null);

  const [gameIsFinished, setGameIsFinished] = useState(false);

  const gameRef = useMemo(() => {
    if (!game) return null;
    const db = getDatabase();
    return ref(db, `${FIREBASE_PATHS.GAMES}/${game.code}`);
  }, [game]);

  const currentGamer = useMemo(
    () => game?.gamers.find(({ info }) => info.name === user?.name),
    [game?.gamers, user?.name]
  );

  const userGamer = useMemo(() => {
    return game?.gamers.find(({ info }) => info.name === user?.name);
  }, [game?.gamers, user]);

  const restGamers = useMemo(() => {
    const userIndex = game?.gamers.find(
      ({ info }) => info.name === user?.name
    )?.index;

    if (typeof userIndex === "undefined") return [];
    const [firstPart, secondPart] = game?.gamers.reduce(
      (acc, obj) => {
        if (obj.index === userIndex) return acc;
        acc[obj.index < userIndex ? 0 : 1].push(obj);
        return acc;
      },
      [[], []] as [TGamer[], TGamer[]]
    ) as [TGamer[], TGamer[]];
    return [...secondPart, ...firstPart];
  }, [game?.gamers, user?.name]);

  const followToGame = useCallback(() => {
    if (!id) return;
    const db = getDatabase();
    const gameRef = ref(db, `${FIREBASE_PATHS.GAMES}/${id}`);
    const unSub = onValue(gameRef, async (gameSnapshot) => {
      if (!gameSnapshot.exists()) return;
      const game = gameSnapshot.val() as TGame;
      setGame(game);
    })
    return () => {
      unSub();
    };
  }, [id]);

  const updateGame = useCallback(
    async (data: Partial<TGame>) => {
      try {
        if (!game) return;
        const updatedGame: TGame = { ...game, ...data };
        const newGame: TGame = {
          ...updatedGame,
          inTableCards:
            typeof updatedGame.inTableCards === "string"
              ? updatedGame.inTableCards
              : JSON.stringify(updatedGame.inTableCards),
        };
        await changeData(FIREBASE_PATHS.GAMES, String(game.code), newGame);
      } catch (error) {
        console.error(error);
      }
    },
    [changeData, game]
  );

  const followGamersStatuses = useCallback(async () => {
    try {
      if (!game || !game.started || !gameRef) return;
      onValue(gameRef, async (gameStatusesSnapshot) => {
        const gameStatusesData = gameStatusesSnapshot.val();
        const gamersStatuses = gameStatusesData.gamers as TGamerStatus[];
        const updatedGame = await getData<TGame>(
          FIREBASE_PATHS.GAMES,
          String(game.code)
        );
        if (!updatedGame) return;
        const { gamers, finishedGamersPlaces } = updatedGame;
        const updatedFinishedGamersPlaces = [...finishedGamersPlaces];
        const updatedGamers = gamers.map((gamer) => {
          const gamerStatus = gamersStatuses.find(({ id }) => id === gamer.id);
          if (!gamerStatus) return gamer;
          if (gamerStatus.status === gamer.status) return gamer;
          if (gamerStatus.status === GAMER_STATUSES.FINISH) {
            const place = updatedFinishedGamersPlaces.length + 1;
            updatedFinishedGamersPlaces.push({ gamer, place: place });
          }
          return {
            ...gamer,
            status: gamerStatus.status,
          };
        });
        await updateGame({
          gamers: updatedGamers,
          finishedGamersPlaces: updatedFinishedGamersPlaces,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }, [game, gameRef, getData, updateGame]);

  const checkGamerFinishStatus = useCallback(
    async (game: TGame, gamerName: string) => {
      try {
        const currentGamer = game.gamers.find(
          ({ info }) => info.name === gamerName
        );
        if (!currentGamer || !user) return;
        const gameIsFinished =
          !game.remainingCards.length && !currentGamer.cards.length;
        if (!gameIsFinished || !gameRef) return;
        let gamersStatusesData: { gamers: TGamerStatus[] } | null = null;
        const snapshot = await get(gameRef);
        if (snapshot.exists()) {
          gamersStatusesData = snapshot.val();
        }
        if (!gamersStatusesData) return;
        const gamerNewStatusData = {
          id: user.id,
          name: user.name,
          status: GAMER_STATUSES.FINISH,
        };
        const updatedGamersStatusesData = gamersStatusesData.gamers.map(
          (gamer) => {
            if (gamer.name === gamerNewStatusData.name)
              return gamerNewStatusData;
            return gamer;
          }
        );
        set(gameRef, {
          gamers: updatedGamersStatusesData,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [gameRef, user]
  );

  const attackHandler = useCallback(
    async (card: TCard) => {
      try {
        if (!game || !currentGamer) return;
        const isValidCard = checkAttackerCard(
          card,
          (game?.inTableCards as TCard[][]) || []
        );
        if (!isValidCard) {
          notification("Card is not valid", "error");
          return;
        }
        const newGamers = removeCardFromDeck(game, currentGamer, card);
        const newInTableCards = [...(game.inTableCards as TCard[][]), [card]];

        if (!newGamers) return;
        const newGame: TGame = {
          ...game,
          inTableCards: JSON.stringify(newInTableCards),
          gamers: newGamers,
        };
        await updateGame(newGame);
        // await changeGameTimes({
        //   attackerMinutes: null,
        //   defenderMinutes: GAMERS_TIMES.DEFENDER,
        //   gameId: String(game.code),
        // });

        await checkGamerFinishStatus(newGame, currentGamer.info.name);
      } catch (error) {
        console.error(error);
      }
    },
    [checkGamerFinishStatus, currentGamer, game, updateGame]
  );

  const handleSelectCard = useCallback(
    (card: TCard) => {
      try {
        const userIsPassiveGamerOnTheMoment =
          game?.attacker !== user?.name && game?.defender !== user?.name;
        if (userIsPassiveGamerOnTheMoment) return;

        const userIsAttacker = game?.attacker === user?.name;
        if (userIsAttacker) {
          attackHandler(card);
        }

        const userIsDefender = game?.defender === user?.name;
        if (userIsDefender) {
          dispatch(selectDefenderCard(card));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [attackHandler, game, user, dispatch]
  );

  const handleUnselectCard = useCallback(
    () => dispatch(unselectDefenderCard()),
    [dispatch]
  );

  const closeAttackCardHandler = useCallback(
    async (inTableCardGroup: TCard[], groupIndex: number) => {
      try {
        if (!defenderSelectedCard) {
          notification("Select card", "error");
          return;
        }
        if (inTableCardGroup.length !== 1) {
          notification("All cards is closed", "info");
          return;
        }
        if (!game?.trump.trump || !currentGamer) return;

        const isValidCard = checkDefenderCard(
          defenderSelectedCard,
          inTableCardGroup[0],
          game.trump.trump
        );
        if (!isValidCard) {
          notification("Card is not valid", "error");
          return;
        }
        const newGamers = removeCardFromDeck(
          game,
          currentGamer,
          defenderSelectedCard
        );
        if (!newGamers) return;
        const cloneInTableCards = [...(game.inTableCards as TCard[][])];
        cloneInTableCards[groupIndex] = [
          ...inTableCardGroup,
          defenderSelectedCard,
        ];

        const newGame = {
          gamers: newGamers,
          inTableCards: JSON.stringify(cloneInTableCards),
        };
        await updateGame(newGame);

        const defenderNewMinutes = cloneInTableCards.some(
          (cardGroup) => cardGroup.length === 1
        )
          ? GAMERS_TIMES.DEFENDER
          : null;
        const attackerNewMinutes = cloneInTableCards.some(
          (cardGroup) => cardGroup.length === 1
        )
          ? null
          : GAMERS_TIMES.ATTACKER;

        // await changeGameTimes({
        //   attackerMinutes: attackerNewMinutes,
        //   defenderMinutes: defenderNewMinutes,
        //   gameId: String(game.code),
        // });
        const updatedGame: TGame = {
          ...game,
          ...newGame,
        };
        await checkGamerFinishStatus(updatedGame, currentGamer.info.name);
      } catch (error) {
        console.error(error);
      }
    },
    [
      // changeGameTimes,
      checkGamerFinishStatus,
      currentGamer,
      defenderSelectedCard,
      game,
      updateGame,
    ]
  );

  const finishTheLap = useCallback(async () => {
    try {
      if (!game) return;
      const { attacker: newAttacker, defender: newDefender } =
        recognizeAttackerAndDefenderOnFinishLap(game);
      const { gamers: gameNewGamers, remainingCards: gameRemainingCards } =
        updateGamersOnFinishLap(game);

      const updatedGame = {
        attacker: newAttacker,
        defender: newDefender,
        gamers: gameNewGamers,
        remainingCards: gameRemainingCards,
        alreadyPlayedAttackersCount: 0,
        inTableCards: "[]",
        defenderSurrendered: false,
      };

      await updateGame(updatedGame);
      // await changeGameTimes({
      //   attackerMinutes: GAMERS_TIMES.ATTACKER,
      //   gameId: String(game.code),
      // });
    } catch (error) {
      console.error(error);
    }
  }, [game, updateGame]);

  const transferAttackerPlace = useCallback(async () => {
    try {
      if (!game) return;
      const newAttacker = recognizeAttackerOnTransferPlace(game);
      await updateGame({
        attacker: newAttacker,
        alreadyPlayedAttackersCount: game.alreadyPlayedAttackersCount + 1,
      });
      // await changeGameTimes({
      //   attackerMinutes: GAMERS_TIMES.ATTACKER,
      //   gameId: String(game.code),
      // });
    } catch (error) {
      console.error(error);
    }
  }, [game, updateGame]);

  const finishUserTurnHandler = useCallback(async () => {
    try {
      if (!game) return;

      const newAlreadyPlayedAttackersCount =
        game.alreadyPlayedAttackersCount + 1;

      const allAttackersIsAlreadyPlays =
        newAlreadyPlayedAttackersCount === game.gamers.length - 1;

      if (allAttackersIsAlreadyPlays) {
        await finishTheLap();
        return;
      }
      await updateGame({
        alreadyPlayedAttackersCount: newAlreadyPlayedAttackersCount,
      });
      await transferAttackerPlace();
    } catch (error) {
      console.error(error);
    }
  }, [finishTheLap, transferAttackerPlace, game, updateGame]);

  const takeInTableCards = useCallback(async () => {
    try {
      await updateGame({ defenderSurrendered: true });
    } catch (error) {
      console.error(error);
    }
  }, [updateGame]);

  const suspendAttacker = useCallback(async () => {
    try {
      if (!game) return;

      const updatedGamers: TGamer[] = game.gamers.map((gamer) => {
        if (gamer.info.name === game.attacker)
          return { ...gamer, status: GAMER_STATUSES.SUSPENDED };
        return gamer;
      });
      const filteredGame: TGame = { ...game, gamers: updatedGamers };
      const { attacker: newAttacker, defender: newDefender } =
        recognizeAttackerAndDefenderOnFinishLap(filteredGame);
      const { gamers: gameNewGamers, remainingCards: gameRemainingCards } =
        updateGamersOnFinishLap(filteredGame);

      const updatedGame = {
        attacker: newAttacker,
        defender: newDefender,
        gamers: gameNewGamers,
        remainingCards: gameRemainingCards,
        alreadyPlayedAttackersCount: 0,
        inTableCards: "[]",
      };

      notification(`${game.attacker} is left game!`, "info");

      await updateGame(updatedGame);
      // await changeGameTimes({
      //   attackerMinutes: GAMERS_TIMES.ATTACKER,
      //   gameId: String(game.code),
      // });
    } catch (error) {
      console.error(error);
    }
  }, [game, updateGame]);

  return {
    id,
    game,
    defenderSelectedCard,
    userGamer,
    restGamers,
    gameIsFinished,
    followToGame,
    handleSelectCard,
    handleUnselectCard,
    closeAttackCardHandler,
    finishUserTurnHandler,
    takeInTableCards,
    suspendAttacker,
    followGamersStatuses,
  };
};
