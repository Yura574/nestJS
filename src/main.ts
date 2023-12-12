import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser'
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))
    app.enableCors({
      origin:  'http://localhost:3001/', 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    });
    app.use(cookieParser())
    const config = new DocumentBuilder()
        .setTitle('Coplasca store')
        .setDescription('Doc REST API')
        .setVersion('1.0.0')
        .addTag('lololo')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
    await app.listen(process.env.PORT );
  }
  catch (e) {
    console.log(e)

  }

}
start();
