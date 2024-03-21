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
import { get, getDatabase, onDisconnect, ref, set } from "firebase/database";

export const useGameConnection = () => {
  const { user } = useUserContext();
  const { cards } = useAppContext();
  const { changeData, getData } = useFirebase();
  const navigate = useNavigate();
  const { changeGameTimes } = useTimer();

  const connectUserToGamer = useCallback(
    async (gameCode: string) => {
      if (!user) return;
      try {
        const db = getDatabase();
        const gamesRef = ref(db, `${FIREBASE_PATHS.GAMES}/${gameCode}`);
        let data: null | {
          gamers: { id: number; name: string; status: GAMER_STATUSES }[];
        } = null;
        const snapshot = await get(gamesRef);
        if (snapshot.exists()) {
          data = snapshot.val();
        }
        const userData = {
          id: user.id,
          name: user.name,
          status: GAMER_STATUSES.ACTIVE,
        };
        set(gamesRef, {
          gamers: !data ? [userData] : [...data.gamers, userData],
        });
      } catch (error) {
        console.error(error);
      }
    },
    [user]
  );

  const disconnectUserFromGame = useCallback(
    async (game: TGame) => {
      if (!user) return;
      try {
        const db = getDatabase();
        const gamesRef = ref(db, `${FIREBASE_PATHS.GAMES}/${game.code}`);
        let data: null | {
          gamers: { id: number; name: string; status: GAMER_STATUSES }[];
        } = null;
        const snapshot = await get(gamesRef);
        if (snapshot.exists()) {
          data = snapshot.val();
        }
        const disconnectRef = onDisconnect(gamesRef);
        const newData = data?.gamers.filter(({ id }) => id !== user.id) || [];
        if (!newData.length) {
          disconnectRef.remove();
          return;
        }
        disconnectRef.set({ gamers: newData });
      } catch (error) {
        console.error(error);
      }
    },
    [user]
  );

  const createGame = useCallback(
    async (creatingForm: TGameCreateRequest) => {
      try {
        if (!user || !cards) return;

        const gameCode = generateGameCode();
        const { trump: trumpCard } = randomizeTrump(cards);
        const { gamerCards, remainingCards } = getRandomCards(
          cards,
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
          inTableCards: "[]",
          alreadyPlayedAttackersCount: 0,
          defenderSurrendered: false,
          gamersCount: Number(creatingForm.gamersCount),
        };

        await changeData(
          FIREBASE_PATHS.GAMES,
          String(requestData.code),
          requestData
        );
        await connectUserToGamer(String(gameCode));
        navigate(`${APP_ROUTES.GAME}/${requestData.code}`);
      } catch (error) {
        console.error(error);
      }
    },
    [user, cards, changeData, connectUserToGamer, navigate]
  );

  const joinToGame = useCallback(
    async (joiningForm: TGameJoinRequest) => {
      try {
        if (!user) return;

        const foundGame = await getData<TGame>(
          FIREBASE_PATHS.GAMES,
          joiningForm.code
        );

        if (!foundGame) {
          console.log(`game with ${joiningForm.code} is not found`);
          return;
        }

        if (foundGame.coins > user.coins) {
          console.log(`you don't have that many coins`);
          return;
        }

        if (Number(foundGame.gamersCount) === foundGame.gamers.length) {
          console.log(`game with ${joiningForm.code} is crowded with players`);
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
          },
        ];
        const started = updatedGamers.length === Number(foundGame.gamersCount);

        const { attacker, defender } = recognizeAttackerAndDefenderOnStart(
          updatedGamers,
          foundGame.trump.trump
        );

        const requestData: TGame = {
          ...foundGame,
          gamers: updatedGamers,
          remainingCards,
          ...(started && { started, defender, attacker }),
        };

        await changeData(
          FIREBASE_PATHS.GAMES,
          String(requestData.code),
          requestData
        );
        if (started) {
          changeGameTimes({
            attackerMinutes: GAMERS_TIMES.ATTACKER,
            gameId: joiningForm.code,
          });
        }
        await connectUserToGamer(String(requestData.code));
        navigate(`${APP_ROUTES.GAME}/${requestData.code}`);
      } catch (error) {
        console.error(error);
      }
    },
    [changeData, changeGameTimes, connectUserToGamer, getData, navigate, user]
  );

  return {
    createGame,
    joinToGame,
    disconnectUserFromGame,
    connectUserToGamer,
  };
};
