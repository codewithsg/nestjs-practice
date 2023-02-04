import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule {
  // configure(consumer:MiddlewareConsumer){
  //   consumer.apply(ValidateCustomerMiddleware).forRoutes({
  //     path:'customers/search/:id',
  //     method:RequestMethod.GET
  //   })
  // }
  configure(consumer:MiddlewareConsumer){
    consumer.apply(ValidateCustomerMiddleware,ValidateCustomerAccountMiddleware,(req:Request,res:Response,next:NextFunction)=>{
      console.log('last middleware');
      next();
    })
    .exclude({
      path:'api/customers/create',
      method:RequestMethod.POST
    },{
      path:'api/customers',
      method:RequestMethod.GET
    })
    .forRoutes(CustomersController);
  }
}
