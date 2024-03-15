import { TUser } from "./user"

export type TFriend = {
    user: TUser;
}

export type TFriendsData = {
    friendsIds: number[];
    requestsIds: number[];
}

export type TFriendFindRequest = {
    userName: string;
}