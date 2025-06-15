import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // enlève les propriétés non déclarées
    forbidNonWhitelisted: true, // bloque la requête si une prop non attendue est présente
    transform: true,        // transforme en bons types
  }));

  app.enableCors({
    origin: 'http://localhost:8080',  
    methods: 'GET, POST, DELETE, PUT, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(3405);
}
bootstrap();

