import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magasin } from './magasin.entity';
import { MagasinController } from './magasin.controller';
import { MagasinService } from './magasin.service';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';
import { Produit } from 'src/produit/produit.entity';
import { Visiteur } from 'src/visiteur/visiteur.entity';



// This module is responsible for managing stores (Magasin).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to stores.
@Module({
  imports: [
    TypeOrmModule.forFeature([
    Magasin, 
    AvisUtilisateur, 
    Produit, 
    Visiteur])],

  controllers: [MagasinController],
  providers: [MagasinService],
  exports: [TypeOrmModule],
})
export class MagasinModule {}