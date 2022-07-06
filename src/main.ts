import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser'

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))
    app.enableCors({
      origin:  'http://localhost:3000',
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    });
    app.use(cookieParser())
    await app.listen(process.env.PORT );
  }
  catch (e) {
    console.log(e)

  }

}
start();
