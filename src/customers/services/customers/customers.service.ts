import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
    findCustomer(){
        return {
            email:'test@admin.com',
            id:1,
            createdAt: new Date()
        };
    }
}
