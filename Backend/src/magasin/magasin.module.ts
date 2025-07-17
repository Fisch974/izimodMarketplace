import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magasin } from './magasin.entity';
import { MagasinController } from './magasin.controller';
import { MagasinService } from './magasin.service';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';
import { Produit } from 'src/produit/produit.entity';
import { Visiteur } from 'src/visiteur/visiteur.entity';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { AvisUtilisateurService } from 'src/avisUtilisateur/avisUtilisateur.service';
import { ProduitService } from 'src/produit/produit.service';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { VisiteurService } from 'src/visiteur/visiteur.service';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';



// This module is responsible for managing stores (Magasin).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to stores.
@Module({
  imports: [
    TypeOrmModule.forFeature([
    Magasin, 
    Utilisateur,
    Produit,
    AvisUtilisateur,
    Visiteur,
    Role
  ])],

  controllers: [MagasinController],
  providers: [MagasinService, UtilisateurService, AvisUtilisateurService, ProduitService, VisiteurService, RoleService],
  exports: [TypeOrmModule, MagasinService],
})
export class MagasinModule {}