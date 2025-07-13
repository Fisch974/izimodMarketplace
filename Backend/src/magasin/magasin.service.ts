import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';
import { Produit } from 'src/produit/produit.entity';
import { Visiteur } from 'src/visiteur/visiteur.entity';
import { Repository } from 'typeorm';
import { Magasin } from './magasin.entity';
import { CreateMagasinDto } from './create_Magasin.dto';

// This module is responsible for managing stores (Magasin).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to stores.
@Injectable()
export class MagasinService {
  constructor(
          @InjectRepository(AvisUtilisateur)
          private readonly avisRepo: Repository<AvisUtilisateur>,
        
          @InjectRepository(Produit)
          private readonly produitRepo: Repository<Produit>,
        
          @InjectRepository(Visiteur)
          private readonly visiteurRepo: Repository<Visiteur>,

          @InjectRepository(Magasin)
          private readonly magasinRepo: Repository<Magasin>,

        ) {}
  // Create a new store
  // This method creates a new store with the provided data and associates it with the specified product, review, and visitor.
  async createMagasin(dto: CreateMagasinDto): Promise<Magasin> {
    const produit = await this.produitRepo.findOne({ where: { id: dto.produit_id } });
    if (!produit) {
      throw new Error('Produit non trouvé');
    }

    const avis = await this.avisRepo.findOne({ where: { id: dto.avisUtilisateur_id } });
    if (!avis) { 
      throw new Error('Avis non trouvé');
    }

    const visiteur = await this.visiteurRepo.findOne({ where: { id: dto.visiteur_id } });
    if (!visiteur) {
      throw new Error('Visiteur non trouvé');
    }
    const newMagasin = this.magasinRepo.create({
      nom: dto.nom,
      creerLe: dto.creerLe ? new Date(dto.creerLe) : new Date(),
      type: dto.type,
      avisUtilisateurs: [avis],
      visiteurs: [visiteur],
      produits: [produit],
    });

    return this.magasinRepo.save(newMagasin);
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

  // Update a store by ID
  // This method updates a specific store with the provided data and associates it with the specified product, review, and visitor.
  async updateMagasin(id: number, dto: CreateMagasinDto): Promise<Magasin> {
    const magasin = await this.magasinRepo.findOne({ where: { id } });  
    if (!magasin) {
      throw new Error('Magasin non trouvé');
    }

    const produit = await this.produitRepo.findOne({ where: { id: dto.produit_id } });
    if (!produit) {
      throw new Error('Produit non trouvé');
    }

    const avis = await this.avisRepo.findOne({ where: { id: dto.avisUtilisateur_id } });
    if (!avis) { 
      throw new Error('Avis non trouvé');
    }

    const visiteur = await this.visiteurRepo.findOne({ where: { id: dto.visiteur_id } });
    if (!visiteur) {
      throw new Error('Visiteur non trouvé');
    }

    magasin.nom = dto.nom;
    magasin.creerLe = dto.creerLe ? new Date(dto.creerLe) : new Date()
    magasin.type = dto.type;
    magasin.avisUtilisateurs = [avis];
    magasin.visiteurs = [visiteur];
    magasin.produits = [produit];
    return this.magasinRepo.save(magasin);

  }

  async deleteMagasin(id: number): Promise<void> {
    const magasin = await this.magasinRepo.findOne({ where: { id } });
    if (!magasin) {
      throw new Error('Magasin non trouvé');
    }
    await this.magasinRepo.remove(magasin);
  }
}