import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { AvisUtilisateur } from "../avisUtilisateur/avisUtilisateur.entity";
import { Magasin } from "../magasin/magasin.entity";

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar', length: 65})
  designation!: string;

  @Column({type: 'decimal', precision: 10, scale: 2})
  prix!: number;

  @Column({type: 'int'})
  stock!: number;

  @Column({type: 'date'})
  dateAjout!: Date;

  @Column({type: 'varchar', length: 100})
  description!: string;

  @Column({type: 'varchar', length: 65})
  categorie!: string;

  @Column({type: 'varchar', length: 255})
  imagePath!: string;

  // Relation avec la table AvisUtilisateur
  @OneToMany(() => AvisUtilisateur, avis => avis.produit)
  avisUtilisateurs!: AvisUtilisateur[];

  @ManyToOne(() => Magasin, magasin => magasin.produits)
  magasin!: Magasin;

}