import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { TCard, TGame, TGamer } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../configs";
import { FIREBASE_PATHS, GAMERS_TIMES, GAMER_STATUSES } from "../constants";
import { useUserContext } from "../contexts";
import {
  checkAttackerCard,
  checkDefenderCard,
  recognizeAttackerAndDefenderOnFinishLap,
  removeCardFromDeck,
  updateGamersOnFinishLap,
} from "../utils";
import { useFirebase } from "./useFirebase";
import { useTimer } from "./useTimer";
import { RootState, selectDefenderCard, unselectDefenderCard } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "../ui";
import { getDatabase, ref, onValue } from "firebase/database";

export const useGame = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useUserContext();

  const defenderSelectedCard = useSelector(
    (store: RootState) => store.gameReducer.defenderSelectedCard
  );

  const { changeGameTimes } = useTimer();

  const { changeData } = useFirebase();

  const [game, setGame] = useState<TGame | null>(null);

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
    const unSub = onSnapshot(doc(database, FIREBASE_PATHS.GAMES, id), (doc) => {
      const game = doc.data() as TGame;
      //* JSON.parse for Firebase inside arrays issue
      setGame({
        ...game,
        inTableCards: JSON.parse(
          (game?.inTableCards as string) || ""
        ) as TCard[][],
      });
    });
    return () => {
      unSub();
    };
  }, [id]);

  const followGamersStatuses = useCallback(async () => {
    try {
      if (!game || !game.started) return;
      const db = getDatabase();
      const gameRef = ref(db, `${FIREBASE_PATHS.GAMES}/${game.code}`);
      onValue(gameRef, async (snapshot) => {
        const data = snapshot.val() as {
          gamers: {
            id: number;
            name: string;
            status: GAMER_STATUSES;
          }[];
        };
        const gamersStatuses = data.gamers;
        const gamers = game.gamers;
        const updatedGamers: TGamer[] = [];
        gamers.forEach((gamer) => {
          const foundStatus = gamersStatuses.find(
            ({ name }) => gamer.info.name === name
          );
          if (!foundStatus) {
            updatedGamers.push({ ...gamer, status: GAMER_STATUSES.SUSPENDED });
          } else {
            updatedGamers.push({ ...gamer, status: foundStatus.status });
          }
        });
        const newGame: TGame = {
          ...game,
          gamers: updatedGamers,
        };
        await updateGame(newGame);
      });
    } catch (error) {
      console.error(error);
    }
  }, [game]);

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
        await updateGame({
          inTableCards: JSON.stringify(newInTableCards),
          gamers: newGamers,
        });
        await changeGameTimes({
          attackerMinutes: null,
          defenderMinutes: GAMERS_TIMES.DEFENDER,
          gameId: String(game.code),
        });
      } catch (error) {
        console.error(error);
      }
    },
    [changeGameTimes, currentGamer, game, updateGame]
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

        await changeGameTimes({
          attackerMinutes: attackerNewMinutes,
          defenderMinutes: defenderNewMinutes,
          gameId: String(game.code),
        });
      } catch (error) {
        console.error(error);
      }
    },
    [changeGameTimes, currentGamer, defenderSelectedCard, game, updateGame]
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
      await changeGameTimes({
        attackerMinutes: GAMERS_TIMES.ATTACKER,
        gameId: String(game.code),
      });
    } catch (error) {
      console.error(error);
    }
  }, [changeGameTimes, game, updateGame]);

  const transferAttackerPlace = useCallback(async () => {
    try {
      if (!game) return;

      const prevAttackerIndex =
        game?.gamers.find(({ info }) => info.name === game.attacker)?.index ||
        0;

      const prevDefenderIndex =
        game?.gamers.find(({ info }) => info.name === game.defender)?.index ||
        0;

      const nextAttackerIndex =
        prevAttackerIndex + 1 === prevDefenderIndex
          ? prevAttackerIndex + 2
          : prevAttackerIndex + 1;

      const readyNewAttacker = game?.gamers.find(
        ({ index }) =>
          index ===
          (nextAttackerIndex === game.gamers.length ? 0 : nextAttackerIndex)
      )?.info.name;
      const newAlreadyPlayedAttackersCount =
        game.alreadyPlayedAttackersCount + 1;

      await updateGame({
        attacker: readyNewAttacker,
        alreadyPlayedAttackersCount: newAlreadyPlayedAttackersCount,
      });
      await changeGameTimes({
        attackerMinutes: GAMERS_TIMES.ATTACKER,
        gameId: String(game.code),
      });
    } catch (error) {
      console.error(error);
    }
  }, [changeGameTimes, game, updateGame]);

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
      await changeGameTimes({
        attackerMinutes: GAMERS_TIMES.ATTACKER,
        gameId: String(game.code),
      });
    } catch (error) {
      console.error(error);
    }
  }, [changeGameTimes, game, updateGame]);

  return {
    id,
    game,
    defenderSelectedCard,
    userGamer,
    restGamers,
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
