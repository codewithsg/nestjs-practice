import {NestMiddleware,Injectable} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
        console.log('hello world, i am inside validatecustomermiddleware!');
        const {authorization} = req.headers;
        if(!authorization)
        return res.status(403).send({error:'No Authentication Token Provided'})
        if(authorization==='hello'){
        next();
        }else{
            return res.status(403).send({error:'Invalid Authentication Token Provided'});
        }
    }
}