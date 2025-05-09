import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvisUtilisateur } from './avisUtilisateur.entity';
import { Magasin } from '../magasin/magasin.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { CreateAvisUtilisateurDto } from './create_Avis.dto';
import { Produit } from '../produit/produit.entity';

@Injectable()
export class AvisUtilisateurService {
    constructor(
        @InjectRepository(AvisUtilisateur)
        private readonly avisRepo: Repository<AvisUtilisateur>,
      
        @InjectRepository(Magasin)
        private readonly magasinRepo: Repository<Magasin>,
      
        @InjectRepository(Utilisateur)
        private readonly utilisateurRepo: Repository<Utilisateur>,
      
        @InjectRepository(Produit)
        private readonly produitRepo: Repository<Produit>,
      ) {}

  async getAllAvis(): Promise<AvisUtilisateur[]> {
    return this.avisRepo.find({
      relations: ['utilisateur', 'produit', 'magasin'],
    });
  }


  async getAvisByMagasinId(magasinId: number): Promise<AvisUtilisateur[]> {
    return this.avisRepo.find({
      where: { magasin: { id: magasinId } },
      relations: ['utilisateur', 'produit', 'magasin'],
    });
  }


  async createAvis(dto: CreateAvisUtilisateurDto): Promise<AvisUtilisateur> {
    // On récupère l'utilisateur uniquement si l'ID est fourni et il est valide
    const utilisateur = dto.utilisateur_id
      ? await this.utilisateurRepo.findOne({ where: { id: dto.utilisateur_id } })
      : undefined;
  
    // On récupère le magasin et le produit, ils sont obligatoires donc on lance une erreur si non trouvés
    const magasin = await this.magasinRepo.findOne({ where: { id: dto.magasin_id } });
    if (!magasin) {
      throw new Error('Magasin non trouvé');
    }
  
    const produit = await this.produitRepo.findOne({ where: { id: dto.produit_id } });
    if (!produit) {
      throw new Error('Produit non trouvé');
    }
  
    // On crée l'avis avec les données, en faisant attention aux relations (null/undefined)
    const avis = this.avisRepo.create({
      commentaire: dto.commentaire,
      date: dto.date ? new Date(dto.date) : new Date(),
      note: dto.note,
      visible: dto.visible,
      utilisateur: utilisateur || undefined,  // Si utilisateur est trouvé, on le passe. Sinon, on le laisse undefined.
      magasin,  // Le magasin est toujours présent.
      produit,  // Le produit est toujours présent.
    });
  
    // Sauvegarder l'avis dans la base de données
    return this.avisRepo.save(avis);
  }
  
  
  


  async getAvisById(id: number): Promise<AvisUtilisateur | null> {
    return this.avisRepo.findOne({
      where: { id },
      relations: ['utilisateur', 'produit', 'magasin'],
    });
  }


  async deleteAvis(id: number): Promise<void> {
    await this.avisRepo.delete(id);
  }
}
