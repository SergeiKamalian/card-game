import { TCard, TGame, TUser } from "../types";

export const APP_CONTEXT_DEFAULT_VALUES = {
    initializeApplication: () => { },
    cards: [] as (TCard[] | null)
}

export const USER_CONTEXT_DEFAULT_VALUES = {
    userAuthStatus: false,
    user: null as (TUser | null),
    changeUser: (user: TUser | null) => { }
}

export const GAME_CONTEXT_DEFAULT_VALUES = {
    id: '' as (string | undefined),
    followToGame: () => { },
    game: null as (TGame | null),
    handleSelectCard: (card: TCard) => { },
    defenderSelectedCard: null as TCard | null,
    closeAttackCardHandler: (inTableCardGroup: TCard[], groupIndex: number) => { }
}