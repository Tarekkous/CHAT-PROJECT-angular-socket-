import { Room } from "./room.model";
import { User } from "./user";

export class Message {
    readonly _id?:string;
    userID?:User[]
    roomdID?:Room[];
    friendID?:User[];
    date?:Date;
    content?:string;

}
