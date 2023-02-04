import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { ICustomer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
   private customers:ICustomer[] = [
        {
            id:1,
            email:'admin@test.com',
            name:'Admin'
        },{
            id:2,
            email:'superadmin@test.com',
            name:'Super Admin'
        },{
            id:3,
            email:'user@test.com',
            name:'User'
        }
    ];

    findCustomerById(id:number){
        return this.customers.find((customer)=>customer.id ===id)
    }

    createCustomer(customerDto:CreateCustomerDto){
        this.customers.push(customerDto)
    }

    getCustomers(){
        return this.customers;
    }
}
