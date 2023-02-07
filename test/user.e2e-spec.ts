import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./../src/app.module";
import * as request from 'supertest';

describe('UsersController E2E Test',()=>{
    let app:INestApplication;

    beforeAll(async ()=>{
        const moduleFixture:TestingModule = await Test.createTestingModule({
            imports:[AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api')
        await app.init();
    });
    
    describe('create new user POST /api/users/create',()=>{
        const CREATE_USER_URL = '/api/users/create';
        it('should create a new user',()=>{
            return request(app.getHttpServer()).post(CREATE_USER_URL).send({
                username:'spinz',
                password:'adminTest',
                email:'spinz@test.com'
            }).expect(201);
        });

        it('should return a 400 when username is invalid',()=>{
            return request(app.getHttpServer()).post(CREATE_USER_URL).send({
                username:'spi',
                password:'adminTest',
                email:'spinz@test.com'
            }).expect(400);
        });

        it('should return a 400 when password is invalid',()=>{
            return request(app.getHttpServer()).post(CREATE_USER_URL).send({
                username:'spinz',
                password:'adminTe',
                email:'spinz@test.com'
            }).expect(400);
        })

        it('should return a 400 when email is invalid',()=>{
            return request(app.getHttpServer()).post(CREATE_USER_URL).send({
                username:'spinz',
                password:'adminTest',
                email:'spinz'
            }).expect(400);
        })
    })
});