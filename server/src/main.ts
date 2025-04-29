import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Валидация
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Настройки CORS
  const allowedOrigin = config.getOrThrow<string>('ALLOWED_ORIGIN');
  app.enableCors({
    origin: allowedOrigin,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  // Порт приложения
  const port = config.getOrThrow<number>('APPLICATION_PORT');

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Allowed origin: ${allowedOrigin}`);
}
bootstrap();
