import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
    users = [
        {
            id:1,
            email:'admin@test.com',
            createdAt:new Date()
        },{
            id:2,
            email:'superadmin@test.com',
            createdAt:new Date()
        },{
            id:3,
            email:'user@test.com',
            createdAt:new Date()
        }
    ];

    findCustomerById(id:number){
        return this.users.find((user)=>user.id ===id)
    }
}
