import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from 'src/produit/produit.entity';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { Repository} from 'typeorm';
import { Paiement } from './paiement.entity';
import { CreatePaiementDto } from './create_Paiement.dto';
import { Transactions } from 'src/transaction/transaction.entity';


// This service is responsible for managing payments.
// It contains methods for creating, retrieving, and managing payments in the database.
@Injectable()
export class PaiementService {
  constructor(
            @InjectRepository(Utilisateur)
            private readonly utilisateurRepo: Repository<Utilisateur>,
          
            @InjectRepository(Produit)
            private readonly produitRepo: Repository<Produit>,
          
            @InjectRepository(Transactions)
            private readonly transactionRepo: Repository<Transactions>,

            @InjectRepository(Paiement)
            private readonly paiementRepo: Repository<Paiement>,

          ) {}
  // This method creates a new payment in the database.
  // It accepts a CreatePaiementDto object as a parameter, which contains the necessary data for creating a payment.
  async createPaiement(dto: CreatePaiementDto): Promise<Paiement> { 
    const produit = await this.produitRepo.findOne({ where: { id: dto.produit_id } });
    if (!produit) {
      throw new Error('Produit non trouvé');
    }

    const utilisateur = await this.utilisateurRepo.findOne({ where: { id: dto.utilisateur_id } });
    if (!utilisateur) {
      throw new Error('Utilisateur non trouvé');
    }
    const transaction = await this.transactionRepo.findOne({ where: { id: dto.transaction_id } });
    if (!transaction) { 
      throw new Error('Transaction non trouvée');
    }

    const newPaiement = this.paiementRepo.create({
      montant: dto.montant,
      date: dto.date ? new Date(dto.date) : new Date(),
      status: dto.statut,
      mode: dto.mode,
      produit: produit,
      utilisateur: utilisateur,
      transaction: transaction,
    });

    return this.paiementRepo.save(newPaiement);
  }

  // This method retrieves all payments from the database.
  // It returns an array of Paiement objects, each containing the details of a payment.
  async getAllPaiements(): Promise<Paiement[]> {
    return this.paiementRepo.find({
      relations: ['utilisateur', 'produit', 'transaction'],
    });
  }

  // This method retrieves a payment by its ID from the database.
  // It accepts an ID as a parameter and returns the corresponding Paiement object.
  async getPaiementById(id: number): Promise<Paiement> {
    const paiement = await this.paiementRepo.findOne({
      where: { id },
      relations: ['utilisateur', 'produit', 'transaction'],
    });
    if (!paiement) {
      throw new Error('Paiement non trouvé');
    }

    return paiement;
  }

  // This method retrieves payments by user ID from the database.
  // It accepts an ID as a parameter and returns an array of Paiement objects.
  async getPaiementByUtilisateurId(id: number): Promise<Paiement[]> {
    return this.paiementRepo.find({
      where: { utilisateur: { id } },
      relations: ['utilisateur', 'produit', 'transaction'],
    });
  }

  // This method retrieves payments by product ID from the database.
  // It accepts an ID as a parameter and returns an array of Paiement objects.
  // It also includes the relations for utilisateur, produit, and transaction.
  async getPaiementByProduitId(id: number): Promise<Paiement[]> {
    return this.paiementRepo.find({
      where: { produit: { id } },
      relations: ['utilisateur', 'produit', 'transaction'],
    });
  }
}