import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import entities from './typeORM';
import { User } from './typeORM/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'nestjs_practice_db',
      entities:entities,
      synchronize:true 
    }),
    AuthModule,
    PassportModule.register({
      session:true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
