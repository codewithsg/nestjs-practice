import { Injectable } from '@nestjs/common';
import { IUser, SerializedUser } from 'src/users/types/User';
import {plainToClass} from 'class-transformer';

@Injectable()
export class UsersService {
    private users:IUser[] = [
        {
            id:1,
            username:'prowell',
            password:'prowell'
        },{
            id:2,
            username:'ram',
            password:'ram'
        },{
            id:3,
            username:'shyam',
            password:'shyam'
        },{
            id:4,
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

    getUserById(id:number){
        return this.users.find((user)=>user.id===id)
    }
}
