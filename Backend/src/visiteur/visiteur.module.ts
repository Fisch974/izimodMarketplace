import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visiteur } from './visiteur.entity';
import { VisiteurController } from './visiteur.controller';
import { VisiteurService } from './visiteur.service';

@Module({
  imports: [TypeOrmModule.forFeature([Visiteur])],
  controllers: [VisiteurController],
  providers: [VisiteurService],
  exports: [TypeOrmModule],
})
export class VisiteurModule {}