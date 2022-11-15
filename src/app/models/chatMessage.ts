import { User } from "./user";

export class chatMessage {

  readonly _id?: string;
    content?: string;
    date?: Date;
    friendID?: User[];
    userID?: User[];
    __v?: number;

}



