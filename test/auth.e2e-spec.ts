import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./../src/app.module";
import * as request from 'supertest';
import * as passport from 'passport';
import * as session from 'express-session';
import { TypeormStore } from "connect-typeorm/out";
import { DataSource } from "typeorm";
import { SessionEntity } from "./../src/typeORM/Session";

describe('AuthController E2E Test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        app.use(session({
            name: 'NESTJS_SESSION_ID',
            secret: 'helloworldfromsecretkey1728368',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000
            },
            store: new TypeormStore().connect(app.get(DataSource).getRepository(SessionEntity))
            // store:new TypeormStore().connect(sessionRepository)
        }));
        app.use(passport.initialize());
        app.use(passport.session());

        await app.init();
    });

    describe('Authentication', () => {
        const URL = '/api/auth/login';
        let cookie ='';
        it('should throw unauthorized  error for invalid username', () => {
            return request(app.getHttpServer()).post(URL).send({
                username: 'adm',
                password: 'adminTest'
            }).expect(401)
        })

        it('should throw unauthorized  error for invalid password', () => {
            return request(app.getHttpServer()).post(URL).send({
                username: 'admin',
                password: 'adminTest123'
            }).expect(401)
        })

        it('should login', (done) => {
            request(app.getHttpServer()).post(URL).send({
                username: 'spinz',
                password: 'adminTest'
            }).expect(201).end((err,res)=>{
                cookie = res.headers['set-cookie'];
                done();
            })
        });

        it('should visit /api/users and return 200',()=>{
            return request(app.getHttpServer()).get('/api/users').set('Cookie',cookie).expect(200)
        })
    })
})