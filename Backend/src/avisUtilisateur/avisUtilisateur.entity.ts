import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Magasin } from '../magasin/magasin.entity';
import { Produit } from '../produit/produit.entity';
import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

// AvisUtilisateur Entity
// This entity represents the user reviews in the database.
// It contains fields for the review ID, comment, date, rating, visibility status, and relationships with other entities.
@Entity()
export class AvisUtilisateur {
  @PrimaryGeneratedColumn()
  id!: number;


  @Transform(({ value }) => sanitizeHtml(value))
  @Column({ type: 'text' })
  commentaire!: string;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({ type: 'date' })
  date!: Date;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({ type: 'int'})
  note!: number;

  @Column({ type: 'boolean' })
  visible!: boolean;

  // Relations for Utilisateur, Magasin, and Produit
  // Utilisateur is optional, so we use nullable
  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.avisUtilisateurs, { nullable: true })
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur!: Utilisateur;

  // Magasin and Produit are required, so we don't use nullable
  @ManyToOne(() => Magasin, magasin => magasin.avisUtilisateurs)
  @JoinColumn({ name: 'magasin_id' })
  magasin!: Magasin;

  // Produit is required, so we don't use nullable
  @ManyToOne(() => Produit, produit => produit.avisUtilisateur)
  @JoinColumn({ name: 'produit_id' })
  produit!: Produit;

  
}
