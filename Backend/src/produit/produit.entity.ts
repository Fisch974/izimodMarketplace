import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { AvisUtilisateur } from "../avisUtilisateur/avisUtilisateur.entity";
import { Magasin } from "../magasin/magasin.entity";
import { IsIn, IsOptional } from "class-validator";
import sanitizeHtml from 'sanitize-html';
import { Transform } from "class-transformer";

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'varchar', length: 65})
  designation!: string;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'decimal', precision: 10, scale: 2})
  prix!: number;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'int'})
  stock!: number;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'date'})
  dateAjout!: Date;

  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'varchar', length: 100})
  description!: string;

  @IsIn(['produit', 'service'], { message: 'La catégorie doit être "produit" ou "service"' })
  @Transform(({ value }) => sanitizeHtml(value))
  @Column({ type: 'varchar', length: 65 })
  categorie!: string;


  @Transform(({ value }) => sanitizeHtml(value))
  @Column({type: 'varchar', length: 255})
  @IsOptional()
  imagePath?: string;

  // Relation avec la table AvisUtilisateur
  @OneToMany(() => AvisUtilisateur, avis => avis.produit)
  avisUtilisateur?: AvisUtilisateur[];

  @ManyToOne(() => Magasin, (magasin) => magasin.produits, { onDelete: 'CASCADE' })
  magasin: Magasin;

}