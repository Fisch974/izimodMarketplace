import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Produit } from './produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';
import { Magasin } from 'src/magasin/magasin.entity';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';


// This module is responsible for managing products (Produit).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to products.
// It also imports the Magasin and AvisUtilisateur entities to manage relationships with stores and user reviews.
// The ProduitModule is responsible for handling product-related operations such as creating, updating, and retrieving
@Module({
  imports: 
  [TypeOrmModule.forFeature([
    Produit,
    Magasin,
    AvisUtilisateur
  ])],
  controllers: [ProduitController],
  providers: [ProduitService],
  exports: [TypeOrmModule],
})
export class ProduitModule {}