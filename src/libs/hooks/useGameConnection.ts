import { useCallback } from "react";
import {
  TGame,
  TGameCreateRequest,
  TGameJoinRequest,
  TGamer,
  TGamerInfo,
} from "../types";
import {
  generateGameCode,
  getRandomCards,
  randomizeTrump,
  recognizeAttackerAndDefenderOnStart,
} from "../utils";
import { useAppContext, useUserContext } from "../contexts";
import { useFirebase } from "./useFirebase";
import {
  APP_ROUTES,
  FIREBASE_PATHS,
  GAMERS_TIMES,
  GAMER_STATUSES,
} from "../constants";
import { useNavigate } from "react-router";
import { useTimer } from "./useTimer";
import { getDatabase, onDisconnect, ref } from "firebase/database";
import { notification } from "../ui";

export const useGameConnection = () => {
  const { user } = useUserContext();
  const { cards } = useAppContext();
  const { changeRealtimeData, getRealtimeData } = useFirebase();
  const navigate = useNavigate();
  const { getGameUpdatedTimes } = useTimer();

  const disconnectUserFromGame = useCallback(
    async (game: TGame) => {
      if (!user) return;
      try {
        const gameData = await getRealtimeData<TGame>(FIREBASE_PATHS.GAMES, String(game.code));
        const db = getDatabase();
        const gameRef = ref(db, `${FIREBASE_PATHS.GAMES}/${game.code}`);
        const disconnectRef = onDisconnect(gameRef);
        if (!gameData) return;
        const updatedGamers = gameData.gamers.map(gamer => {
          if (gamer.id === user.id) return {
            ...gamer,
            status: GAMER_STATUSES.SUSPENDED,
          }
          return gamer;
        })
        const activeGamers = updatedGamers.filter(({ status }) => status === GAMER_STATUSES.ACTIVE);
        if (!activeGamers.length) {
          await disconnectRef.remove()
          return;
        }
        if (activeGamers.length === 1) {
          const gameDataWithSingleActiveGamer = {
            ...gameData,
            gamers: updatedGamers,
            finishedGamersPlaces: [{ gamer: activeGamers[0], place: 1 }],
            finished: true
          }
          await disconnectRef.set(gameDataWithSingleActiveGamer)
          return;
        }
        const updatedData: TGame = {
          ...gameData,
          gamers: updatedGamers
        }
        disconnectRef.set(updatedData);
      } catch (error) {
        console.error(error);
      }
    },
    [getRealtimeData, user]
  );

  const createGame = useCallback(
    async (creatingForm: TGameCreateRequest) => {
      try {
        if (!user || !cards) return;
        //todo
        const testCards = cards.slice(0, 15);

        const gameCode = generateGameCode();
        const { trump: trumpCard } = randomizeTrump(testCards);
        const { gamerCards, remainingCards } = getRandomCards(
          testCards,
          [],
          trumpCard
        );

        const gamerInfo: TGamerInfo = {
          name: user.name,
          avatarURL: user.avatarURL,
          level: user.level,
        };

        const gamers: TGamer[] = [
          {
            cards: gamerCards,
            info: gamerInfo,
            index: 0,
            status: GAMER_STATUSES.ACTIVE,
            id: user.id,
          },
        ];

        const requestData: TGame = {
          ...creatingForm,
          private: creatingForm.private === "true",
          code: gameCode,
          started: false,
          trump: trumpCard,
          remainingCards,
          gamers,
          attacker: null,
          defender: null,
          inTableCards: [],
          alreadyPlayedAttackersCount: 0,
          defenderSurrendered: false,
          gamersCount: Number(creatingForm.gamersCount),
          finishedGamersPlaces: [],
          finished: false,
          gamersTimes: {
            attackerFinishTime: null,
            defenderFinishTime: null
          }
        };

        await changeRealtimeData(
          FIREBASE_PATHS.GAMES,
          String(requestData.code),
          requestData
        );
        navigate(`${APP_ROUTES.GAME}/${requestData.code}`);
      } catch (error) {
        console.error(error);
      }
    },
    [user, cards, changeRealtimeData, navigate]
  );

  const joinToGame = useCallback(
    async (joiningForm: TGameJoinRequest) => {
      try {
        if (!user) return;

        const foundGame = await getRealtimeData<TGame>(
          FIREBASE_PATHS.GAMES,
          joiningForm.code
        );

        if (!foundGame) {
          notification(`Game with ${joiningForm.code} is not found`, 'error');
          return;
        }

        if (foundGame.coins > user.coins) {
          notification(`You don't have that many coins`, 'error');
          return;
        }

        if (Number(foundGame.gamersCount) === foundGame.gamers.length) {
          notification(`Game with code ${joiningForm.code} is crowded with players`, 'error');
          return;
        }

        const { gamerCards, remainingCards } = getRandomCards(
          foundGame.remainingCards,
          [],
          foundGame.trump
        );
        const updatedGamers = [
          ...foundGame.gamers,
          {
            cards: gamerCards,
            info: {
              name: user.name,
              avatarURL: user.avatarURL,
              level: user.level,
            },
            index: foundGame.gamers.length,
            status: GAMER_STATUSES.ACTIVE,
            id: user.id,
          },
        ];
        const started = updatedGamers.length === Number(foundGame.gamersCount);

        const { attacker, defender } = recognizeAttackerAndDefenderOnStart(
          updatedGamers,
          foundGame.trump.trump
        );

        const gameTimes = started ? await getGameUpdatedTimes({
          attackerMinutes: GAMERS_TIMES.ATTACKER,
          gameId: joiningForm.code,
        }) : null


        const requestData: TGame = {
          ...foundGame,
          gamers: updatedGamers,
          remainingCards,
          ...(started && {
            started,
            defender,
            attacker,
          }),
          ...(gameTimes && {
            gamersTimes: {
              attackerFinishTime: gameTimes.attackerFinishTime || null,
              defenderFinishTime: gameTimes.defenderFinishTime || null
            }
          }),
        };

        await changeRealtimeData(
          FIREBASE_PATHS.GAMES,
          String(requestData.code),
          requestData
        );
        navigate(`${APP_ROUTES.GAME}/${requestData.code}`);
      } catch (error) {
        console.error(error);
      }
    },
    [changeRealtimeData, getGameUpdatedTimes, getRealtimeData, navigate, user]
  );

  return {
    createGame,
    joinToGame,
    disconnectUserFromGame,
  };
};
