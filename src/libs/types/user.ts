import { TFriendsData } from "./friend";

export type TUserAdditionalInformation = {
    level: number;
    coins: number;
    friends: TFriendsData;
    messagesCount: number;
    avatarURL: string;
}

export interface TUser extends TUserAdditionalInformation {
    name: string;
    createdAt: string;
    password: string;
    id: number;
}

export type TUserRequest = TUser;

export type TUserForm = {
    name: string;
    password: string;
}

export type TConnectedUser = {
    connected: boolean;
    gameRequest?: {
        id: number;
        finishedAt: string;
        friendId: number;
    }
}