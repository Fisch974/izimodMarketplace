import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Magasin } from '../magasin/magasin.entity';
import { Produit } from '../produit/produit.entity';

@Entity()
export class AvisUtilisateur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  commentaire!: string;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'int', length: 5 })
  note!: number;

  @Column({ type: 'boolean' })
  visible!: boolean;

  // Clé étrangère vers Utilisateur, uniquement si l'utilisateur est enregistré
  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.avisUtilisateurs)
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur!: Utilisateur;

  // Clé étrangère vers le magasin (si le produit appartient à un magasin)
  @ManyToOne(() => Magasin, magasin => magasin.avisUtilisateurs)
  magasin!: Magasin;

  // Référence produit
  @ManyToOne(() => Produit, produit => produit.avisUtilisateurs)
  @JoinColumn({ name: 'produit_id' })
  produit!: Produit;

  
}
