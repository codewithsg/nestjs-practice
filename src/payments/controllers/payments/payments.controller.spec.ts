import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsService } from 'src/payments/services/payments/payments.service';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentService:PaymentsService;

  const requestMock = {
    query:{},
  } as unknown as Request;

  const statusResponseMock = {
    send:jest.fn((x)=>x)  
  }

  const responseMock = {
    status:jest.fn((x)=>statusResponseMock),
    send:jest.fn((x)=>x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers:[{
        provide:'PAYMENTS_SERVICE',
        useValue:{
          createPayment:jest.fn((x)=>{
            if(x.email==='admin@test.com')
            {
              return {status:'success'}
            }else{
              throw new BadRequestException
            }
          })
        }
      }]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentsService>('PAYMENTS_SERVICE')
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('payment service should b e defined',()=>{
    expect(paymentService).toBeDefined();
  })

  describe('getPayments',()=>{
    it('should return a status of 400',()=>{
      controller.getPayments(requestMock,responseMock)
      expect(responseMock.status).toHaveBeenCalledWith(400);
      // expect(responseMock.send).toHaveBeenCalledWith({message:'Missing Count or page query parameter'})
      expect(statusResponseMock.send).toHaveBeenCalledWith({message:'Missing Count or page query parameter'})

    });

    it('should return status of 200 when query are present',async ()=>{
      requestMock.query={
        count:'10',
        page:'1'
      };
     await controller.getPayments(requestMock,responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    })
  });

  describe('createPayment',()=>{
    it('should throw an error',async()=>{
      jest.spyOn(paymentService,'createPayment').mockImplementationOnce(()=>{
        throw new BadRequestException();
      })
      try{
      const response = await controller.createPayment({
        email:'admin@admin.com',
        price:100
      })
    }catch(err){
      console.log(err);
    }
    });

    it('should return a successfull response',async()=>{
      const response = await controller.createPayment({
        email:'admin@test.com',
        price:100
      });
      console.log('res:',response);
      expect(response).toStrictEqual({status:'success'});
    })
  })
  
});
