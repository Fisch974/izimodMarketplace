import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { IsEmail, IsString, Length } from "class-validator";
import { Role } from '../role/role.entity';
import { Magasin } from '../magasin/magasin.entity';
import { ProduitParJour } from "../produitParJour/produitParJour.entity";
import { Paiement } from '../paiement/paiement.entity';
import { AvisUtilisateur } from "../avisUtilisateur/avisUtilisateur.entity";

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  @IsString()
  @Length(1, 30)
  nom!: string;

  @Column({ length: 30 })
  @IsString()
  @Length(1, 30)
  prenom!: string;

  @Column({ length: 100 })
  @IsString()
  adresse!: string;

  @Column({ type: 'varchar', length: 30 })
  @IsString()
  telephone!: string;

  @Column({ length: 255 })
  @IsEmail()
  mail!: string;

  @Column({ length: 255 })
  @IsString()
  motDePasse!: string;

  @Column({ type: 'date' })
  dateCreation!: string;

  @ManyToOne(() => Role, { eager: true }) // eager si on veut auto-charger les rôles à chaque fois
  role!: Role;

  @ManyToOne(() => Magasin, { nullable: true })
  magasin?: Magasin;

  @OneToMany(() => ProduitParJour, (produit) => produit.utilisateur)
  produitsParJour!: ProduitParJour[];

  @OneToMany(() => Paiement, paiement => paiement.utilisateur)
  paiements!: Paiement[];

  // Relation avec la table AvisUtilisateur
  @OneToMany(() => AvisUtilisateur, avis => avis.utilisateur)
  avisUtilisateurs!: AvisUtilisateur[];

  

}
