import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Paiement } from '../paiement/paiement.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id!: number;

  // 🆔 ID retourné par l'organisme externe (Stripe, PayPal…)
  @Column({ length: 100 })
  referenceExterne!: string;

  // 💳 Moyen de paiement (carte, PayPal, virement…)
  @Column({ length: 50 })
  moyenPaiement!: string;

  // ✅ Statut de la transaction (success, failed, pending…)
  @Column({ length: 30 })
  statut!: string;

  // 📅 Date à laquelle la transaction a été effectuée
  @Column({ type: 'timestamp' })
  date!: Date;

  // 🔁 Paiements liés à cette transaction
  @OneToMany(() => Paiement, paiement => paiement.transaction)
  paiements!: Paiement[];
}
