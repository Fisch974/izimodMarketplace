import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Produit } from './produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';
import { Magasin } from 'src/magasin/magasin.entity';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';





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