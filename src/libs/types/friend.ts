import { TUser } from "./user"

export type TFriend = {
    user: TUser;
}

export type TFriendsCount = {
    allCount: number;
    requests: number;
}

export type TFriendFindRequest = {
    userName: string;
}