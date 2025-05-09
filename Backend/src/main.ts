import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080',  // Permet uniquement les requêtes de ton frontend
    methods: 'GET, POST, DELETE, UPDATED',           // Autoriser les méthodes que tu souhaites
    allowedHeaders: 'Content-Type',  // Autoriser les en-têtes
  });
  await app.listen(3405);
}
bootstrap();

