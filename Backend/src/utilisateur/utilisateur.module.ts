import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { Magasin } from 'src/magasin/magasin.entity';
import { Role } from 'src/role/role.entity';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';
import { ProduitParJour } from 'src/produitParJour/produitParJour.entity';

// This module is responsible for managing users (Utilisateur).
// It imports the necessary entities and services, and sets up the controller and service for handling requests
@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur,
    Magasin,
    Role,
    AvisUtilisateur,
    ProduitParJour
  ])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}

