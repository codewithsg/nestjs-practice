import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ValidationPipe } from '@nestjs/common/pipes';
import {  Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customersService:CustomersService){}

    @Get(':id')
    getCustomer(@Param('id',ParseIntPipe) id:number, @Res() res:Response){
        const customer =  this.customersService.findCustomerById(id);
        if(customer){
            res.send(customer);
        }else{
            res.status(400).send({msg:'Customer not found'});
        }
    }

    @Get('/search/:id')
    searchCustomerById(@Param('id',ParseIntPipe) id:number){
        const customer = this.customersService.findCustomerById(id);
        if(customer) return customer;
        else throw new HttpException('Customer not found',HttpStatus.BAD_REQUEST)
    }

    @Get('')
    getAllCustomers(){
        return this.customersService.getCustomers();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto:CreateCustomerDto){
        this.customersService.createCustomer(createCustomerDto);
    }
}
