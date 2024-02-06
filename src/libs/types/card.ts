import { TRUMPS } from "../constants"

export type TCard = {
    trump: TRUMPS;
    value: number;
    imageURL: string;
}