import {NestFactory} from "@nestjs/core";
import {AppModule} from "./appModule";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Coplasca-store')
        .setDescription('Documentation')
        .setVersion('1.0.0')
        .addTag('docs')
        .build()
    const doc = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, doc )

   await app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
}

start()