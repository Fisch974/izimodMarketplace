import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

// Role Entity
// This entity represents the role in the database.
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  nom!: string;

  @OneToMany(() => Utilisateur, utilisateur => utilisateur.role)
  utilisateurs!: Utilisateur[];
}
