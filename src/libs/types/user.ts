import { TFriendsCount } from "./friend";

export type TUserAdditionalInformation = {
    level: number;
    coins: number;
    friendsCount: TFriendsCount;
    messagesCount: number;
    avatarURL: string;
}

export interface TUser extends TUserAdditionalInformation {
    name: string;
    createdAt: string;
    password: string;
}

export type TUserRequest = TUser;

export type TUserForm = {
    name: string;
    password: string;
}