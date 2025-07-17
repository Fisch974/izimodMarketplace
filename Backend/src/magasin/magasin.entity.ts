import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AvisUtilisateur } from "../avisUtilisateur/avisUtilisateur.entity";
import { Visiteur } from "../visiteur/visiteur.entity";
import { Produit } from "../produit/produit.entity";
import { Utilisateur } from "../utilisateur/utilisateur.entity";
import { Transform } from "class-transformer";
import sanitizeHtml from 'sanitize-html';


// Magasin Entity
// This entity represents the store in the database.
@Entity()
export class Magasin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'varchar', length: 100})
  nom!: string;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'varchar', length:32})
  telephone: string;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'date'})
  creerLe!: Date;

  
  @OneToOne(() => Utilisateur, utilisateur => utilisateur.magasin)
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur!: Utilisateur;


  @OneToMany(() => AvisUtilisateur, avis => avis.magasin, { cascade: true })
  avisUtilisateurs?: AvisUtilisateur[];

  @OneToMany(() => Visiteur, visiteur => visiteur.magasin, { cascade: true })
  visiteurs?: Visiteur[];

  @OneToMany(() => Produit, produit => produit.magasin, { cascade: true })
  produits?: Produit[];
}