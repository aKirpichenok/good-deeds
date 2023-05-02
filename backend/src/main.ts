import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


const start = async () => {
  try {
    const PORT = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Тестовое задание full-stack developer')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addTag('aKirpichenok')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.enableCors()
    await app.listen(PORT, () => console.log('server started on port' + PORT))
  } catch (e) {

  }
}

start()