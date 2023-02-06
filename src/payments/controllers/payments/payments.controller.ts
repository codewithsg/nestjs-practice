import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDto } from './../../dto/CreatePayment.dto';
import { PaymentsService } from './../../services/payments/payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(
        @Inject('PAYMENTS_SERVICE') private readonly paymentService:PaymentsService
    ){}

    @Get()
    getPayments(@Req() req:Request, @Res() res:Response){
        const {count,page} = req.query;
        if(!count || !page){
            res.status(400).send({message:'Missing Count or page query parameter'})
        }else{
            res.send(200);
        }
    }

    @Post('create')
    async createPayment(@Body() createPaymentDto:CreatePaymentDto){
           const response =  await this.paymentService.createPayment(createPaymentDto);
           return response;
    }
}
