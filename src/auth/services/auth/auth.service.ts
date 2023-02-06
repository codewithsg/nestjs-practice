import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
constructor(
    @Inject('USER_SERVICE') private readonly userService:UsersService
){}

   async validateUser(username:string,password:string){
        const userDB = await this.userService.findUserByUsername(username);
        if(userDB){
            const matched = comparePassword(password,userDB.password);
            if(matched){
                console.log('user validation success',matched);
                return userDB;
            }else{
                console.log('password does not matched');
                return null;
            }
        }
        console.log('user validation failed');
        return null;
    }
}
