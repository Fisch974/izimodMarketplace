import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Utilisateur } from "../utilisateur/utilisateur.entity";
import { Magasin } from "../magasin/magasin.entity";

@Entity()
export class Visiteur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'date'})
  dateVisite!: Date; // Date de la visite du visiteur

  @Column({type: 'boolean'})
  estConnecte!: boolean; // Si le visiteur est actuellement connecté

  // Clé étrangère facultative vers un utilisateur enregistré (s'il s'agit d'un utilisateur inscrit)
  @ManyToOne(() => Utilisateur, { nullable: true })
  utilisateur?: Utilisateur;

  // Infos pour visiteurs anonymes
  @Column({ nullable: true })
  ip?: string; // IP du visiteur pour les visiteurs anonymes

  // Clé étrangère vers le magasin que le visiteur consulte
  @ManyToOne(() => Magasin, magasin => magasin.visiteurs)
  magasin!: Magasin;
}
