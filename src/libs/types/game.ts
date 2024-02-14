import { TCard } from "./card";

export type TGameCreateRequest = {
    gamersCount: number;
    coins: number;
    private: boolean;
}
export type TGameJoinRequest = {
    code: string;
}
export type TTrump = TCard;

export type TGamer = {
    name: string;
    cards: TCard[];
    index: number;
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