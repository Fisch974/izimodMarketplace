import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { Magasin } from 'src/magasin/magasin.entity';
import { ProduitParJour } from 'src/produitParJour/produitParJour.entity';
import { Paiement } from 'src/paiement/paiement.entity';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur,
    Magasin,
    ProduitParJour,
    Paiement,
    AvisUtilisateur,
    Role

    ])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [TypeOrmModule],
})
export class UtilisateurModule {}
