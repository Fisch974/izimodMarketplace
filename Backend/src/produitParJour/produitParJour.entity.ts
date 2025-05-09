import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Paiement } from '../paiement/paiement.entity';

@Entity()
export class ProduitParJour {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'date'})
  date!: Date;

  @Column({type: 'int'})
  quantite!: number;

  // Relation avec Utilisateur (uniquement si vendeur)
  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.produitsParJour, {
    nullable: true,
  })
  utilisateur?: Utilisateur;

  @OneToMany(() => Paiement, paiement => paiement.produit)
    paiements!: Paiement[];

}