import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import {TypeormStore} from 'connect-typeorm';
import { DataSource, getRepository } from 'typeorm';
import { SessionEntity } from './typeORM';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity)
  // const sessionRepository = (await new DataSource({}).initialize()).getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(session({
    name:'NESTJS_SESSION_ID',
    secret:'helloworldfromsecretkey1728368',
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge:60000
    },
    store:new TypeormStore().connect(sessionRepository)
    // store:new TypeormStore().connect(sessionRepository)
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
