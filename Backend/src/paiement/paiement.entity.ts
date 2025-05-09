import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Utilisateur } from "../utilisateur/utilisateur.entity";
import { ProduitParJour } from '../produitParJour/produitParJour.entity';
import { Transaction } from '../transaction/transaction.entity';


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

  // 👤 Utilisateur ayant effectué le paiement
  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.paiements)
  utilisateur!: Utilisateur;

  // 🛒 Produit acheté
  @ManyToOne(() => ProduitParJour, produit => produit.paiements)
  produit!: ProduitParJour;

  // 💰 Transaction associée
  @ManyToOne(() => Transaction, transaction => transaction.paiements)
  transaction!: Transaction;
}