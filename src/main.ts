import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(session({
    name:'NESTJS_SESSION_ID',
    secret:'helloworldfromsecretkey1728368',
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge:900000
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
