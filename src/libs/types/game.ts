import { TCard } from "./card";

export type TGameCreateRequest = {
    gamersCount: number;
    coins: number;
    private: boolean;
}

export type TTrump = TCard;

export type TGamer = {
    name: string;
    cards: TCard[];
}

export type TGame = {
    trump: TTrump;
    gamersCount: number;
    started: boolean;
    remainingCards: TCard[];
    private: boolean;
    coins: number;
    code: number;
    gamers: TGamer[]
}