import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });

  // Add swagger
  const config = new DocumentBuilder()
    .setTitle('Rss-back')
    .setDescription('Documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  // Start server
  await app.listen(port, () =>
    console.log(`Server was started on port ${port}`),
  );
}

bootstrap();
