import { Injectable } from '@nestjs/common';
import { IUser, SerializedUser } from 'src/users/types/User';
import {plainToClass} from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity} from 'src/typeORM';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>
    ){}

    private users:IUser[] = []

    getUsers(){
        return this.users.map((user)=>new SerializedUser(user));
    }

    getUserByUsername(username:string){
        return this.users.find((user)=>user.username===username);
    }

    getUserById(id:number){
        return this.users.find((user)=>user.id===id)
    }

    createUser(createUserDto:CreateUserDto){
      const newUser =  this.userRepository.create(createUserDto);
      return this.userRepository.save(newUser);
    }
}
