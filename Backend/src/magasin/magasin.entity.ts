import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AvisUtilisateur } from "../avisUtilisateur/avisUtilisateur.entity";
import { Visiteur } from "../visiteur/visiteur.entity";
import { Produit } from "../produit/produit.entity";

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

  @OneToMany(() => AvisUtilisateur, avis => avis.magasin)
  avisUtilisateurs!: AvisUtilisateur[];

  @OneToMany(() => Visiteur, visiteur => visiteur.magasin)
  visiteurs!: Visiteur[];

  @OneToMany(() => Produit, produit => produit.magasin)
  produits!: Produit[];
}