import { Message } from "./message.model";
import { Room } from "./room.model";

class Role {
    public isAdmin = true;
    constructor(isAdmin = false) {
        this.isAdmin = isAdmin;

    }
}

export class User {

    readonly _id: number = 0;
    username!: string;
    firstName!: string;
    lastName!: string;
    avatar!: string;
    email?: string;
    password?: string;
    roomsID?: Room[];
    sentMessagesID?: Message[]
    receivedMessagesID?: Message[];
    isLoggedIn?: boolean;
    token?: string;
    country?: string;
    city?: string;
    street?: string;
    zipCode?: number;
    phoneNumber?: string;
    dialCode?: string;
    skills?: string;
    role?: string;
    friendsID?: User[]
    nbMessageEnAttente?: number;





    // !inférence : deviner le type de l'attribut en fonction de l'initialisation de cet attribut
    constructor() {

    }


    // getEmail(): string {
    //     return this.email
    // }

}

//! on crée une interface
// interface Iuser{
//     //age et email sont obligatoires
//     age:number;
//     email:string;
//     getEmail():string;
// }
