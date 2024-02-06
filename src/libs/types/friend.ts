import { TUser } from "./user"

export type TFriend = {
    user: TUser;
}

export type TFriendsCount = {
    allCount: number;
    requests: number;
}