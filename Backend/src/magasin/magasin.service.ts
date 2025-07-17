import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';
import { Produit } from 'src/produit/produit.entity';
import { Visiteur } from 'src/visiteur/visiteur.entity';
import { Repository } from 'typeorm';
import { Magasin } from './magasin.entity';
import { CreateMagasinDto } from './create_Magasin.dto';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';

// This module is responsible for managing stores (Magasin).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to stores.
@Injectable()
export class MagasinService {
  constructor(

          @InjectRepository(Utilisateur)
          private readonly utilisateurRepo: Repository<Utilisateur>,
      
          @InjectRepository(Magasin)
          private readonly magasinRepo: Repository<Magasin>,

        ) {}
  // Create a new store
  // This method creates a new store with the provided data and associates it with the specified product, review, and visitor.
  async create(dto: CreateMagasinDto): Promise<Magasin> {
  const utilisateur = await this.utilisateurRepo.findOne({
    where: { id: dto.utilisateurId },
    relations: ['magasin'], // 👈 assure-toi que la relation est chargée
  });

  if (!utilisateur) throw new NotFoundException("Utilisateur introuvable");

  if (utilisateur.magasin) {
    throw new BadRequestException("Cet utilisateur possède déjà un magasin.");
  }

  const magasin = this.magasinRepo.create({
    nom: dto.nom,
    telephone: dto.telephone,
    creerLe: dto.creerLe,
    utilisateur,
  });

  return await this.magasinRepo.save(magasin);
}




  // Get all stores
  // This method retrieves all stores from the database, including their associated reviews, products, and visitors.
  async getAllMagasins(): Promise<Magasin[]> {
    return this.magasinRepo.find({
      relations: ['avisUtilisateurs', 'produits', 'visiteurs'],
    });
  }

  // Get a store by ID
  // This method retrieves a specific store by its ID, including its associated reviews, products, and visitors.
  async getMagasinById(id: number): Promise<Magasin> {

    const magasin = await this.magasinRepo.findOne({
      where: { id },
      relations: ['avisUtilisateurs', 'produits', 'visiteurs'],
    });

    if (!magasin) {
      throw new Error('Magasin non trouvé');
    }
    
    return magasin
  }

  // Get stores by product ID
  // This method retrieves all stores associated with a specific product ID, including their associated reviews and visitors.
  async getMagasinByProduitId(produitId: number): Promise<Magasin[]> {
    return this.magasinRepo
      .createQueryBuilder('magasin')
      .leftJoinAndSelect('magasin.produits', 'produit')
      .leftJoinAndSelect('magasin.avisUtilisateurs', 'avis')
      .leftJoinAndSelect('magasin.visiteurs', 'visiteur')
      .where('produit.id = :produitId', { produitId })
      .getMany();
  }

  async getMagasinByUtilisateurId(utilisateurId: number): Promise<Magasin | null> {
    try {
      return await this.magasinRepo.findOne({
        where: { utilisateur: { id: utilisateurId } },
        relations: ['utilisateur']
      });
    } catch (error) {
      console.error('Erreur dans getMagasinByUtilisateurId:', error);
      return null;
    }
  }

  

  // Get stores by review ID
  // This method retrieves all stores associated with a specific review ID, including their associated products and visitors.
  async getMagasinByAvisId(avisId: number): Promise<Magasin[]> {
    return this.magasinRepo
      .createQueryBuilder('magasin')
      .leftJoinAndSelect('magasin.avisUtilisateurs', 'avis')
      .leftJoinAndSelect('magasin.produits', 'produit')
      .leftJoinAndSelect('magasin.visiteurs', 'visiteur')
      .where('avis.id = :avisId', { avisId })
      .getMany();
  }

  async deleteMagasin(id: number): Promise<void> {
    const magasin = await this.magasinRepo.findOne({ where: { id } });
    if (!magasin) {
      throw new Error('Magasin non trouvé');
    }
    await this.magasinRepo.remove(magasin);
  }
}