import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './produit.entity';
import { Repository } from 'typeorm';
import { Magasin } from '../magasin/magasin.entity';
import { AvisUtilisateur } from 'src/avisUtilisateur/avisUtilisateur.entity';
import { CreateProduitDto } from './create_Produit_dto';

// This module for managing products (Produit).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to products.
@Injectable()
export class ProduitService {
  constructor(
            
    @InjectRepository(Produit)
    private readonly produitRepo: Repository<Produit>,

    @InjectRepository(Magasin)
    private readonly magasinRepo: Repository<Magasin>,

    @InjectRepository(AvisUtilisateur)
    private readonly avisUtilisateurRepo: Repository<AvisUtilisateur>,  

  ) {}


  // Create a new product
  // This method creates a new product with the provided data and associates it with the specified store and user review.
  async CreateProduit(dto: CreateProduitDto): Promise<Produit> {
  const magasin = await this.magasinRepo.findOne({ where: { id: dto.magasin_id } });
  if (!magasin) {
    throw new Error('Magasin not found');
  }

  let avisUtilisateur: AvisUtilisateur | null = null;

  if (dto.avisUtilisateur_id) {
    avisUtilisateur = await this.avisUtilisateurRepo.findOne({ where: { id: dto.avisUtilisateur_id } });

    // Tu peux choisir d'ignorer ou de lever une erreur ici
    if (!avisUtilisateur) {
      console.warn(`⚠️ Aucun avis utilisateur trouvé pour l'id ${dto.avisUtilisateur_id}`);
    }
  }

  const newProduit = this.produitRepo.create({
    designation: dto.designation,
    description: dto.description,
    prix: dto.prix,
    stock: dto.stock,
    dateAjout: dto.dateAjout ? new Date(dto.dateAjout) : new Date(),
    categorie: dto.categorie,
    imagePath: dto.imagePath,
    magasin: magasin,
    avisUtilisateur: avisUtilisateur ? [avisUtilisateur] : [],
  });

  return this.produitRepo.save(newProduit);
}


  // Update an existing product
  // This method updates an existing product with the provided data and associates it with the specified store and user review.
  async UpdateProduit(id: number, dto: CreateProduitDto): Promise<Produit> {
    const produit = await this.produitRepo.findOne({ where: { id } });

    if (!produit) {
      throw new Error('Produit not found');
    }

    const magasin = await this.magasinRepo.findOne({ where: { id: dto.magasin_id } });
    if (!magasin) {
      throw new Error('Magasin not found');
    }

    const avisUtilisateur = await this.avisUtilisateurRepo.findOne({ where: { id: dto.avisUtilisateur_id } });

    if (!avisUtilisateur) {
      throw new Error('AvisUtilisateur not found');
    }


    produit.designation = dto.designation;
    produit.description = dto.description;
    produit.prix = dto.prix;
    if (dto.stock !== undefined) produit.stock = dto.stock;
    produit.dateAjout = dto.dateAjout ? new Date(dto.dateAjout) : new Date();
    produit.categorie = dto.categorie;
    if (dto.imagePath !== undefined) produit.imagePath = dto.imagePath;
    produit.magasin = magasin;
    produit.avisUtilisateur = [avisUtilisateur];

    return this.produitRepo.save(produit);
  }

  async getProduitById(id: number): Promise<Produit> {
    const produit = await this.produitRepo.findOne({ where: { id } });
    if (!produit) {
      throw new Error('Produit not found');
    }
    return produit;
  }

  async getProduitByAvisId(avisId: number): Promise<Produit> {
    const avis = await this.avisUtilisateurRepo.findOne({
      where: { id: avisId },
      relations: ['produit'],
    });

    if (!avis || !avis.produit) {
      throw new Error('Produit associé à cet avis non trouvé');
    }

    return avis.produit;
  }


  async getProduitByMagasinId(magasinId: number): Promise<Produit[]> {
    return this.produitRepo
      .createQueryBuilder('produit')
      .leftJoinAndSelect('produit.magasin', 'magasin')
      .where('magasin.id = :magasinId', { magasinId })
      .getMany();
  }

  async getAllProduits(): Promise<Produit[]> {
    return this.produitRepo.find();
  }

  async deleteProduit(id: number): Promise<void> {
    const produit = await this.produitRepo.findOne({ where: { id } });
    if (!produit) {
      throw new Error('Produit not found');
    }
    await this.produitRepo.remove(produit);
  }


}