import { TCard, TChangeGameTimes, TGame, TGameTimes, TGamer, TUser } from "../types";

export const APP_CONTEXT_DEFAULT_VALUES = {
    initializeApplication: () => { },
    cards: [] as (TCard[] | null)
}
export const APP_LOADING_CONTEXT_DEFAULT_VALUES = {
    appLoading: false,
    setAppLoading: (loading: boolean) => {}
}

export const USER_CONTEXT_DEFAULT_VALUES = {
    userAuthStatus: false,
    user: null as (TUser | null),
    changeUser: (user: TUser | null) => { },
}

export const GAME_CONTEXT_DEFAULT_VALUES = {
    id: '' as (string | undefined),
    followToGame: () => { },
    game: null as (TGame | null),
    handleSelectCard: (card: TCard) => { },
    defenderSelectedCard: null as TCard | null,
    closeAttackCardHandler: (inTableCardGroup: TCard[], groupIndex: number) => { },
    finishUserTurnHandler: () => { },
    takeInTableCards: () => { },
    userGamer: {} as TGamer | undefined,
    restGamers: [] as TGamer[],
    suspendAttacker: () => { }
}

export const TIMER_CONTEXT_DEFAULT_VALUES = {
    gameTimes: null as (TGameTimes | null),
    followTheGameTimes: () => { },
    changeGameTimes: ({ gameId }: TChangeGameTimes) => { },
    followTheAttackerTime: () => { },
    followTheDefenderTime: () => { }
}