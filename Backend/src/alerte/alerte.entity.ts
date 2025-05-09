import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { ManyToOne } from 'typeorm';

@Entity()
export class Alerte {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar', length: 100})
  type!: string;

  @Column({type: 'text'}) 
  message!: string;

  @Column({
    type: 'enum',
    enum: ['Non lu', 'Traité'],
  })
  statut!: 'Non lu' | 'Traité';

  @Column({type: 'date'})
  date!: Date;

  @ManyToOne(() => Utilisateur, { nullable: true })
  utilisateur?: Utilisateur;

}