import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const uploadPath = path.join(__dirname, '..', 'uploads');

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  
  app.use('/uploads', express.static(uploadPath));

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

