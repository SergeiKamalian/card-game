import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { TCard, TFinisherPlace, TGame, TGamer, TGamerStatus } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS, GAMERS_TIMES, GAMER_STATUSES } from "../constants";
import { useUserContext } from "../contexts";
import {
  checkAttackerCard,
  checkDefenderCard,
  checkPossibilityOfAttack,
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

  const { changeData, getData, changeRealtimeData } = useFirebase();

  const [game, setGame] = useState<TGame | null>(null);

  const [gameIsFinished, setGameIsFinished] = useState(false);

  const gameRef = useMemo(() => {
    if (!id) return null;
    const db = getDatabase();
    return ref(db, `${FIREBASE_PATHS.GAMES}/${id}`);
  }, [id]);

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
    if (!id || !gameRef) return;
    const unSub = onValue(gameRef, async (gameSnapshot) => {
      if (!gameSnapshot.exists()) return;
      const game = gameSnapshot.val() as TGame;
      setGame(game);
    });
    return () => {
      unSub();
    };
  }, [id, gameRef]);

  const updateGame = useCallback(
    async (data: Partial<TGame>) => {
      try {
        if (!game) return;
        const updatedGame: TGame = { ...game, ...data };
        await changeRealtimeData(
          FIREBASE_PATHS.GAMES,
          String(game.code),
          updatedGame
        );
      } catch (error) {
        console.error(error);
      }
    },
    [changeRealtimeData, game]
  );

  const checkGamerFinishStatus = useCallback(
    (game: TGame, gamerName: string) => {
      const defaultValues = {
        gamers: game.gamers,
        finishedPlaces: game.finishedGamersPlaces || [],
        gameIsFinished: game.finished,
      };

      const currentGamer = game.gamers.find(
        ({ info }) => info.name === gamerName
      );

      if (!currentGamer || !user) return defaultValues;

      const gameIsFinished =
        !game.remainingCards?.length && !currentGamer.cards?.length;

      if (!gameIsFinished || !gameRef) return defaultValues;

      const newGamers = game.gamers.map((gamer) => {
        if (gamer.id === currentGamer.id) {
          return { ...gamer, status: GAMER_STATUSES.FINISHED };
        }
        return gamer;
      });

      const newFinishedUsers = [
        ...(game.finishedGamersPlaces || []),
        {
          gamer: currentGamer,
          place: (game.finishedGamersPlaces?.length || 0) + 1,
        },
      ];

      const globalGameIsFinished =
        newGamers.filter(({ status }) => status === GAMER_STATUSES.ACTIVE)
          .length < 2;

      return {
        gamers: newGamers,
        finishedPlaces: newFinishedUsers,
        gameIsFinished: globalGameIsFinished,
      };
    },
    [gameRef, user]
  );

  const attackHandler = useCallback(
    async (card: TCard) => {
      try {
        if (!game || !currentGamer) return;
        const defenderCards =
          game.gamers.find(({ info }) => info.name === game.defender)?.cards ||
          [];
        const possibleAttack = checkPossibilityOfAttack(
          game.inTableCards,
          defenderCards
        );
        if (!possibleAttack) {
          notification("No free slots for cards!", "error");
        }
        const isValidCard = checkAttackerCard(
          card,
          (game?.inTableCards as TCard[][]) || []
        );
        if (!isValidCard) {
          notification("Card is not valid", "error");
          return;
        }
        const newGamers = removeCardFromDeck(game, currentGamer, card);

        const newInTableCards = [
          ...((game.inTableCards as TCard[][]) || []),
          [card],
        ];

        const gamersTimes = await getGameUpdatedTimes({
          attackerMinutes: null,
          defenderMinutes: GAMERS_TIMES.DEFENDER,
          gameId: String(game.code),
        });

        if (!newGamers || !gamersTimes) return;

        const newGame: TGame = {
          ...game,
          inTableCards: newInTableCards,
          gamers: newGamers,
          gamersTimes,
        };

        const { finishedPlaces, gameIsFinished, gamers } =
          checkGamerFinishStatus(newGame, currentGamer.info.name);

        const updatedGame: TGame = {
          ...newGame,
          finishedGamersPlaces: finishedPlaces,
          finished: gameIsFinished,
          gamers,
        };

        await updateGame(updatedGame);
      } catch (error) {
        console.error(error);
      }
    },
    [
      checkGamerFinishStatus,
      currentGamer,
      game,
      getGameUpdatedTimes,
      updateGame,
    ]
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
        const cloneInTableCards = [...(game.inTableCards as TCard[][])];
        cloneInTableCards[groupIndex] = [
          ...inTableCardGroup,
          defenderSelectedCard,
        ];
        const defenderNewMinutes = cloneInTableCards.some(
          ({ length }) => length === 1
        )
          ? GAMERS_TIMES.DEFENDER
          : null;
        const attackerNewMinutes = defenderNewMinutes
          ? null
          : GAMERS_TIMES.ATTACKER;

        const gamersTimes = await getGameUpdatedTimes({
          attackerMinutes: attackerNewMinutes,
          defenderMinutes: defenderNewMinutes,
          gameId: String(game.code),
        });

        if (!newGamers || !gamersTimes) return;

        const newGame = {
          ...game,
          gamers: newGamers,
          inTableCards: cloneInTableCards,
          gamersTimes,
        };

        const { finishedPlaces, gameIsFinished, gamers } =
          checkGamerFinishStatus(newGame, currentGamer.info.name);

        const updatedGame: TGame = {
          ...newGame,
          finishedGamersPlaces: finishedPlaces,
          finished: gameIsFinished,
          gamers,
        };

        await updateGame(updatedGame);
      } catch (error) {
        console.error(error);
      }
    },
    [
      checkGamerFinishStatus,
      currentGamer,
      defenderSelectedCard,
      game,
      getGameUpdatedTimes,
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

      const gamersTimes = await getGameUpdatedTimes({
        attackerMinutes: GAMERS_TIMES.ATTACKER,
        defenderMinutes: null,
        gameId: String(game.code),
      });
      if (!gamersTimes) return;

      const updatedGame = {
        attacker: newAttacker,
        defender: newDefender,
        gamers: gameNewGamers,
        remainingCards: gameRemainingCards ? gameRemainingCards : [],
        alreadyPlayedAttackersCount: 0,
        inTableCards: [],
        defenderSurrendered: false,
        gamersTimes,
      };
      console.log(updatedGame);
      console.log(gameRemainingCards);
      await updateGame(updatedGame);
    } catch (error) {
      console.error(error);
    }
  }, [game, getGameUpdatedTimes, updateGame]);

  const transferAttackerPlace = useCallback(async () => {
    try {
      if (!game) return;
      const newAttacker = recognizeAttackerOnTransferPlace(game);
      const gamersTimes = await getGameUpdatedTimes({
        attackerMinutes: GAMERS_TIMES.ATTACKER,
        defenderMinutes: null,
        gameId: String(game.code),
      });
      await updateGame({
        attacker: newAttacker,
        alreadyPlayedAttackersCount: game.alreadyPlayedAttackersCount + 1,
        gamersTimes,
      });
    } catch (error) {
      console.error(error);
    }
  }, [game, getGameUpdatedTimes, updateGame]);

  const finishUserTurnHandler = useCallback(async () => {
    try {
      if (!game) return;

      const newAlreadyPlayedAttackersCount =
        game.alreadyPlayedAttackersCount + 1;

      const allAttackersIsAlreadyPlays =
        newAlreadyPlayedAttackersCount === game.gamers.length - 1;

      if (allAttackersIsAlreadyPlays) {
        console.log("hasav 1");
        await finishTheLap();
        return;
      }
      console.log("hasav");
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

      const gamersTimes = await getGameUpdatedTimes({
        attackerMinutes: GAMERS_TIMES.ATTACKER,
        defenderMinutes: null,
        gameId: String(game.code),
      });

      const updatedGame = {
        attacker: newAttacker,
        defender: newDefender,
        gamers: gameNewGamers,
        remainingCards: gameRemainingCards,
        alreadyPlayedAttackersCount: 0,
        inTableCards: [],
        gamersTimes,
      };

      await updateGame(updatedGame);
    } catch (error) {
      console.error(error);
    }
  }, [game, getGameUpdatedTimes, updateGame]);

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
  };
};
