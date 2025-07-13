import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alerte } from './alerte.entity';
import { AlerteService } from './alerte.service';
import { AlerteController } from './alerte.controller';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Alerte, Utilisateur])],
  controllers: [AlerteController],
  providers: [AlerteService],
  exports: [TypeOrmModule],
})
export class AlerteModule {}