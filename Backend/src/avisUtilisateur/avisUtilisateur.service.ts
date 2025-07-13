import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvisUtilisateur } from './avisUtilisateur.entity';
import { Magasin } from '../magasin/magasin.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { CreateAvisUtilisateurDto } from './create_Avis.dto';
import { Produit } from '../produit/produit.entity';
import { NotFoundException } from '@nestjs/common';

// This module is responsible for managing user reviews (AvisUtilisateur).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to user reviews.
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

  // Get reviews by store ID
  // This method retrieves all reviews associated with a specific store ID.
  async getAvisByMagasinId(magasinId: number): Promise<AvisUtilisateur[]> {
    return this.avisRepo.find({
      where: { magasin: { id: magasinId } },
      relations: ['utilisateur', 'produit', 'magasin'],
    });
  }

  async getAvisByProduitId(produitId: number): Promise<AvisUtilisateur[]> {
    return this.avisRepo.find({
      where: { produit: { id: produitId } },
      relations: ['utilisateur', 'produit', 'magasin'],
    });
  }
  async getAvisByUtilisateurId(utilisateurId: number): Promise<AvisUtilisateur[]> {
    return this.avisRepo.find({
      where: { utilisateur: { id: utilisateurId } },
      relations: ['utilisateur', 'produit', 'magasin'],
    });
  }
  

  // Get reviews by product ID
  // This method retrieves all reviews associated with a specific product ID.
  async createAvis(dto: CreateAvisUtilisateurDto): Promise<AvisUtilisateur> {
    
    const utilisateur = dto.utilisateur_id
      ? await this.utilisateurRepo.findOne({ where: { id: dto.utilisateur_id } })
      : undefined;
  
    
    const magasin = await this.magasinRepo.findOne({ where: { id: dto.magasin_id } });
    if (!magasin) {
      throw new Error('Magasin non trouvé');
    }
  
    const produit = await this.produitRepo.findOne({ where: { id: dto.produit_id } });
    if (!produit) {
      throw new Error('Produit non trouvé');
    }
  
    
    const avis = this.avisRepo.create({
      commentaire: dto.commentaire,
      date: dto.date ? new Date(dto.date) : new Date(),
      note: dto.note,
      visible: dto.visible,
      utilisateur: utilisateur || undefined,  
      magasin, 
      produit, 
    });
  
    
    return this.avisRepo.save(avis);
  }
  
  // Update a review by ID
  // This method updates an existing review based on the provided ID and DTO.
  async updateAvis(id: number, dto: CreateAvisUtilisateurDto): Promise<AvisUtilisateur> {
    const avis = await this.avisRepo.findOne({ where: { id } });
    if (!avis) {
      throw new Error('Avis non trouvé');
    }

    const utilisateur = dto.utilisateur_id
      ? await this.utilisateurRepo.findOne({ where: { id: dto.utilisateur_id } })
      : undefined;
      if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
      }

    const magasin = await this.magasinRepo.findOne({ where: { id: dto.magasin_id } });
    if (!magasin) throw new Error('Magasin non trouvé');

    const produit = await this.produitRepo.findOne({ where: { id: dto.produit_id } });
    if (!produit) throw new Error('Produit non trouvé');

    avis.commentaire = dto.commentaire;
    avis.date = dto.date ? new Date(dto.date) : new Date();
    avis.note = dto.note;
    avis.visible = dto.visible;
    avis.utilisateur = utilisateur;
    avis.magasin = magasin;
    avis.produit = produit;

    return this.avisRepo.save(avis);
  }

  // Get a review by ID
  // This method retrieves a specific review based on the provided ID.
  async getAvisById(id: number): Promise<AvisUtilisateur> {
    const avis = await this.avisRepo.findOne({
      where: { id },
      relations: ['utilisateur', 'produit', 'magasin'],
    });

    if (!avis) {
      throw new NotFoundException(`Aucun avis trouvé avec l'ID ${id}`);
    }

    return avis;
  }

  // Delete a review by ID
  // This method deletes a specific review based on the provided ID.
  async deleteAvis(id: number): Promise<void> {
    await this.avisRepo.delete(id);
  }
}
