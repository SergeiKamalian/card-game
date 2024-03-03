import { GAMER_STATUSES } from "../constants";
import { TCard } from "./card";

export type TGameCreateRequest = {
    gamersCount: number;
    coins: number;
    private: string;
}
export type TGameJoinRequest = {
    code: string;
}
export type TTrump = TCard;

export type TGamerInfo = {
    name: string;
    level: number;
    avatarURL: string;
}

export type TGamer = {
    info: TGamerInfo;
    cards: TCard[];
    index: number;
    status: GAMER_STATUSES
}

export type TGame = {
    trump: TTrump;
    gamersCount: number;
    started: boolean;
    remainingCards: TCard[];
    private: boolean;
    coins: number;
    code: number;
    gamers: TGamer[];
    defender: string | null;
    attacker: string | null;
    inTableCards: TCard[][] | string; // string for firebase issue
    alreadyPlayedAttackersCount: number;
    defenderSurrendered: boolean;
}

export type TGameTimes = {
    attackerFinishTime: string | null;
    defenderFinishTime: string | null;
}

export type TChangeGameTimes = {
    attackerMinutes?: number | null,
    defenderMinutes?: number | null,
    gameId: string
}