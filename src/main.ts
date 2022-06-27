import {NestFactory} from "@nestjs/core";
import {AppModule} from "./App.module";
import {ValidationPipe} from "@nestjs/common";


async function start(){
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }))
    await app.listen(5000)
}

start()