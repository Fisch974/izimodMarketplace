import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { CreateUtilisateurDto } from './create_Utilisateur.dto';
import { Magasin } from 'src/magasin/magasin.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role.entity';
import { UpdateUtilisateurDto } from './update-utilisateur.dto';

// This service is responsible for managing users (Utilisateur).
// It provides methods to create, find, update, and delete users, as well as handling
@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepo: Repository<Utilisateur>,

    @InjectRepository(Magasin)
    private readonly magasinRepo: Repository<Magasin>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createDto: CreateUtilisateurDto): Promise<Utilisateur> {
    const { roleId, magasinId, motDePasse, ...rest } = createDto;

    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Rôle avec l'id ${roleId} introuvable`);
    }

    const magasin = magasinId
      ? (await this.magasinRepo.findOne({ where: { id: magasinId } })) ?? undefined
      : undefined;

    if (magasinId && !magasin) {
      throw new NotFoundException(`Magasin avec l'id ${magasinId} introuvable`);
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const utilisateur = this.utilisateurRepo.create({
      ...rest,
      dateCreation: new Date().toISOString().split('T')[0],
      motDePasse: hashedPassword,
      role,
      magasin,
    });

    return this.utilisateurRepo.save(utilisateur);
  }

  async findAll(): Promise<Partial<Utilisateur>[]> {
    const utilisateurs = await this.utilisateurRepo.find();
    return utilisateurs.map(({ motDePasse, ...safeUser }) => safeUser);
  }

  async findOne(id: number): Promise<Partial<Utilisateur>> {
    const utilisateur = await this.utilisateurRepo.findOne({ where: { id } });
    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} introuvable`);
    }
    const { motDePasse, ...safeUser } = utilisateur;
    return safeUser;
  }

  private async findOneInternal(id: number): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepo.findOne({ where: { id } });
    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} introuvable`);
    }
    return utilisateur;
  }

  async update(id: number, updateDto: UpdateUtilisateurDto): Promise<Utilisateur> {
    const utilisateur = await this.findOneInternal(id);

    const { motDePasse, ...rest } = updateDto;
    Object.assign(utilisateur, rest);

    if (motDePasse) {
      utilisateur.motDePasse = await bcrypt.hash(motDePasse, 10);
    }

    return this.utilisateurRepo.save(utilisateur);
  }

  async remove(id: number): Promise<void> {
    const utilisateur = await this.findOneInternal(id);
    await this.utilisateurRepo.remove(utilisateur);
  }


  async findByEmail(mail: string): Promise<Utilisateur | null> {
    return this.utilisateurRepo.findOne({
      where: { mail },
      relations: ['role'],
    });
  }



}
