import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paiement } from './paiement.entity';
import { PaiementController } from './paiement.controller';
import { PaiementService } from './paiement.service';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { Produit } from 'src/produit/produit.entity';
import { Transactions } from 'src/transaction/transaction.entity';




// This module for managing payments.
// It imports the necessary modules and entities, and provides the controller and service for handling payment-related operations.
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Paiement,
      Utilisateur,
      Produit,
      Transactions
    ])],
  controllers: [PaiementController],
  providers: [PaiementService],
  exports: [TypeOrmModule, PaiementService],
})
export class PaiementModule {}