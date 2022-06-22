import {NestFactory} from "@nestjs/core";
import {AppModule} from "./App.module";


async function start(){
    const app = await NestFactory.create(AppModule)
    await app.listen(5000)
}

start()