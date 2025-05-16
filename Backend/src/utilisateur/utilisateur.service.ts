import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { CreateUtilisateurDto } from './create_Utilisateur.dto';
import { Magasin } from 'src/magasin/magasin.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role.entity'; 
import { UpdateUtilisateurDto } from './update-utilisateur.dto';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepo: Repository<Utilisateur>,

    @InjectRepository(Magasin)
    private readonly magasinRepo: Repository<Magasin>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>, // Inject the Role repository
  
  ) {}

  

  async create(createDto: CreateUtilisateurDto): Promise<Utilisateur> {
  const { roleId, magasinId, motDePasse, ...rest } = createDto;

  // 1. Charger le rôle (obligatoire)
  const role = await this.roleRepository.findOne({ where: { id: roleId } });
  if (!role) {
    throw new NotFoundException(`Rôle avec l'id ${roleId} introuvable`);
  }

  // 2. Charger le magasin (optionnel)
  const magasin = magasinId
  ? (await this.magasinRepo.findOne({ where: { id: magasinId } })) ?? undefined
  : undefined;

  if (magasinId && !magasin) {
    throw new NotFoundException(`Magasin avec l'id ${magasinId} introuvable`);
  }

  // 🔐 Hash du mot de passe
  const hashedPassword = await bcrypt.hash(motDePasse, 10); // 10 = salt rounds

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
    return utilisateurs.map(u => {
      const { motDePasse, ...safeUser } = u;
      return safeUser;
    });
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
    const utilisateur = await this.utilisateurRepo.findOne({ where: { id } });

    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} introuvable`);
    }

    const {motDePasse, ...rest } = updateDto;

    // 🔁 Mise à jour des champs simples
    Object.assign(utilisateur, rest);

    // 🔐 Si mot de passe fourni, on le hash
    if (motDePasse) {
      utilisateur.motDePasse = await bcrypt.hash(motDePasse, 10);
    }

    return this.utilisateurRepo.save(utilisateur);
  }

  async remove(id: number): Promise<void> {
    const utilisateur = await this.findOneInternal(id);
    await this.utilisateurRepo.remove(utilisateur);
  }

}