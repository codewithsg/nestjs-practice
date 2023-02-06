import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../../../typeORM/User';
import { UsersService } from './users.service';
import * as passwordUtils from './../../../utils/bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository:Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide:USER_REPOSITORY_TOKEN,
        useValue:{
          create:jest.fn(),
          save:jest.fn(),
          findOne:jest.fn()
        }
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined',()=>{
    expect(userRepository).toBeDefined();
  });

  describe('createUser',()=>{
    it('should encoded password',async ()=>{
      jest.spyOn(passwordUtils,'encodePassword').mockReturnValue('hashed123')
      await service.createUser({
        username:'ram12',
        email:'ram@test.com',
        password:'adminTest'
      });
    });

    it('should call userRepository.create',async()=>{
      await service.createUser({
        username:'ram12',
        email:'ram@test.com',
        password:'adminTest'
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        username:'ram12',
        email:'ram@test.com',
        password:'hashed123'
      })
    });

    it('should call userRepository.save',async ()=>{
      jest.spyOn(userRepository,'create').mockReturnValueOnce({
        id:1,
        username:'ram12',
        email:'ram@test.com',
        password:'hashed123'
      })
      await service.createUser({
        username:'ram12',
        email:'ram@test.com',
        password:'adminTest'
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        id:1,
        username:'ram12',
        email:'ram@test.com',
        password:'hashed123'
      });
    });
  })
});
