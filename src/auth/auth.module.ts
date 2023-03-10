import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../typeORM/User';
import { UsersService } from './../users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [{
    provide:'AUTH_SERVICE',
    useClass:AuthService
  },{
     provide:'USER_SERVICE',
     useClass:UsersService
  },
  LocalStrategy,
  SessionSerializer
]
})
export class AuthModule {}
