import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req:Request){}


    @Get()
    async getAuthSession(@Session() session:Record<string,any>){
        console.log(session);
        console.log(session.id);
        session.authenticated = true;
        return session;

    }
}
