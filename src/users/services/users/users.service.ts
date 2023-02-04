import { Injectable } from '@nestjs/common';
import { IUser, SerializedUser } from 'src/users/types/User';
import {plainToClass} from 'class-transformer';

@Injectable()
export class UsersService {
    private users:IUser[] = [
        {
            username:'prowell',
            password:'prowell'
        },{
            username:'ram',
            password:'ram'
        },{
            username:'shyam',
            password:'shyam'
        },{
            username:'hari',
            password:'hari'
        },
    ]

    getUsers(){
        return this.users.map((user)=>new SerializedUser(user));
    }

    getUserByUsername(username:string){
        return this.users.find((user)=>user.username===username);
    }
}
