import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvisUtilisateur } from './avisUtilisateur.entity';
import { AvisUtilisateurController } from './avisUtilisateur.controller';
import { AvisUtilisateurService } from './avisUtilisateur.service';
import { Magasin } from '../magasin/magasin.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Produit } from '../produit/produit.entity';


// This module is responsible for managing user reviews (AvisUtilisateur).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to user reviews.
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AvisUtilisateur,
      Magasin,
      Utilisateur,
      Produit,
    ]),
  ],
  controllers: [AvisUtilisateurController],
  providers: [AvisUtilisateurService],
  exports: [TypeOrmModule],
})
export class AvisUtilisateurModule {}
