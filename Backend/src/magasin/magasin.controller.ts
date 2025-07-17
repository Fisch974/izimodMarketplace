import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { CreateMagasinDto } from './create_Magasin.dto';
import { Magasin } from './magasin.entity';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';

@Controller('magasins')
export class MagasinController {
  constructor(private readonly magasinService: MagasinService) {}

  // Create a new store
  // This method creates a new store with the provided data and associates it with the specified product, review, and visitor.
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() dto: CreateMagasinDto) {
    return this.magasinService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check/:userId')
  async checkUserStore(@Param('userId') userId: string) {
    const userIdNumber = parseInt(userId, 10);
    
    if (isNaN(userIdNumber)) {
      return {
        hasStore: false,
        magasin: null,
        error: 'ID utilisateur invalide'
      };
    }

    try {
      const magasin = await this.magasinService.getMagasinByUtilisateurId(userIdNumber);
      
      return {
        hasStore: !!magasin,
        magasin: magasin || null
      };
    } catch (error) {
      console.error('Erreur lors de la vérification du magasin:', error);
      return {
        hasStore: false,
        magasin: null,
        error: 'Erreur lors de la vérification'
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  // Get all stores
  // This method retrieves all stores from the database, including their associated reviews, products, and visitors.
  @Get('all')
  async findAll(): Promise<Magasin[]> {
    return this.magasinService.getAllMagasins();
  }

  @UseGuards(JwtAuthGuard)
  // Get a store by ID
  // This method retrieves a specific store by its ID, including its associated reviews, products, and visitors.
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Magasin> {
    return this.magasinService.getMagasinById(+id);
  }

  @UseGuards(JwtAuthGuard)
  // Get stores by product ID
  // This method retrieves all stores associated with a specific product ID.
  @Get('produit/:produitId')
  async findByProduit(@Param('produitId') produitId: string): Promise<Magasin[]> {
    return this.magasinService.getMagasinByProduitId(+produitId);
  }


  // Get stores by review ID
  // This method retrieves all stores associated with a specific review ID.
  @Get('avis/:avisId')
  async findByAvis(@Param('avisId') avisId: string): Promise<Magasin[]> {
    return this.magasinService.getMagasinByAvisId(+avisId);
  }

  @UseGuards(JwtAuthGuard)
  // Delete a store by ID
  // This method deletes a specific store by its ID.
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.magasinService.deleteMagasin(+id);
    return { message: 'Magasin supprimé avec succès' };
  }
}
