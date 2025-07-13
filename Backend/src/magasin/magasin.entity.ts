import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { AvisUtilisateur } from "../avisUtilisateur/avisUtilisateur.entity";
import { Visiteur } from "../visiteur/visiteur.entity";
import { Produit } from "../produit/produit.entity";
import { Utilisateur } from "../utilisateur/utilisateur.entity";


// Magasin Entity
// This entity represents the store in the database.
@Entity()
export class Magasin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar', length: 100})
  nom!: string;

  @Column({type: 'date'})
  creerLe!: Date;

  @Column({type: 'varchar', length: 100})
  type!: string;

  // Column for the address of the store
  @OneToMany(() => AvisUtilisateur, avis => avis.magasin)
  avisUtilisateurs!: AvisUtilisateur[];


  // Column for the visitors of the store
  // This is a one-to-many relationship, meaning one store can have many visitors
  @OneToMany(() => Visiteur, visiteur => visiteur.magasin)
  visiteurs!: Visiteur[];

  // Column for the products of the store
  // This is a one-to-many relationship, meaning one store can have many products
  @OneToMany(() => Produit, produit => produit.magasin)
  produits!: Produit[];
}