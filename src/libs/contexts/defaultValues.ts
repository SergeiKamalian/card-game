import {
  TCard,
  TChangeGameTimes,
  TFriendFindRequest,
  TGame,
  TGameTimes,
  TGamer,
  TUser,
} from "../types";

export const APP_CONTEXT_DEFAULT_VALUES = {
  initializeApplication: () => {},
  cards: [] as TCard[] | null,
};
export const APP_LOADING_CONTEXT_DEFAULT_VALUES = {
  appLoading: false,
  setAppLoading: (loading: boolean) => {},
  isInitLoading: true,
  setIsInitLoading: (loading: boolean) => {},
};

export const USER_CONTEXT_DEFAULT_VALUES = {
  userAuthStatus: false,
  user: null as TUser | null,
  changeUser: (user: TUser | null) => {},
};

export const GAME_CONTEXT_DEFAULT_VALUES = {
  id: "" as string | undefined,
  followToGame: () => {},
  game: null as TGame | null,
  handleSelectCard: (card: TCard) => {},
  handleUnselectCard: () => {},
  defenderSelectedCard: null as TCard | null,
  closeAttackCardHandler: (inTableCardGroup: TCard[], groupIndex: number) => {},
  finishUserTurnHandler: () => {},
  takeInTableCards: () => {},
  userGamer: {} as TGamer | undefined,
  restGamers: [] as TGamer[],
  suspendAttacker: () => {},
};

export const TIMER_CONTEXT_DEFAULT_VALUES = {
  gameTimes: null as TGameTimes | null,
  followTheGameTimes: () => {},
  changeGameTimes: ({ gameId }: TChangeGameTimes) => {},
  followTheAttackerTime: () => {},
  followTheDefenderTime: () => {},
};
export const FRIENDS_CONTEXT_DEFAULT_VALUES = {
  findFriends: (values: TFriendFindRequest) => {},
  foundUsers: [] as TUser[],
  sendFriendRequest: (user: TUser) => {},
  initFriendsRequests: () => {},
  initUserFriends: () => {},
  friendsRequests: [] as TUser[],
  userFriends: [] as TUser[],
  acceptFriendRequest: (requestUserId: number) => {},
  rejectFriendRequest: (requestUserId: number) => {},
};
