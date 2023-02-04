import { Controller,Inject,Get,Param,UseInterceptors, ParseIntPipe, UseFilters, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { HttpExceptionFilter } from 'src/users/exceptions/HttpException.filter';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/User';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly userService:UsersService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUsers(){
        return this.userService.getUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/username/:username')
    getByUsername(@Param('username') username:string){
        const user = this.userService.getUserByUsername(username)
        if(user)
        return new SerializedUser(user)
        else
        throw new HttpException('User not found',HttpStatus.BAD_REQUEST)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('id/:id')
    getById(@Param('id',ParseIntPipe) id:number){
        const user= this.userService.getUserById(id);
        if(user)
        return new SerializedUser(user);
        else
        throw new UserNotFoundException('user is not found',404);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }
}
