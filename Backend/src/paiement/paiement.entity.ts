import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Utilisateur } from "../utilisateur/utilisateur.entity";
import { ProduitParJour } from '../produitParJour/produitParJour.entity';
import { Transactions } from '../transaction/transaction.entity';


// Paiement Entity
// This entity represents the payment in the database.
@Entity()
export class Paiement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'decimal', precision: 10, scale: 2})
  montant!: number;

  @Column({type: 'date'})
  date!: Date;

  @Column({type: 'varchar', length: 65})
  status!: string;

  @Column({type: 'varchar', length: 65})
  mode!: string;

  // Column for the user who made the payment
  // This is a many-to-one relationship, meaning many payments can be made by one user
  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.paiements)
  utilisateur!: Utilisateur;

  // Column for the product associated with the payment
  // This is a many-to-one relationship, meaning many payments can be associated with one product
  @ManyToOne(() => ProduitParJour, produit => produit.paiements)
  produit!: ProduitParJour;

  // Column for the transaction associated with the payment
  // This is a many-to-one relationship, meaning many payments can be associated with one transaction
  @ManyToOne(() => Transactions, transaction => transaction.paiements)
  transaction!: Transactions;
}