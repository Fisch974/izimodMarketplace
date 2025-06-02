import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { CreateMagasinDto } from './create_Magasin.dto';
import { Magasin } from './magasin.entity';

@Controller('magasins')
export class MagasinController {
  constructor(private readonly magasinService: MagasinService) {}

  // Create a new store
  // This method creates a new store with the provided data and associates it with the specified product, review, and visitor.
  @Post()
  async create(@Body() dto: CreateMagasinDto): Promise<Magasin> {
    return this.magasinService.createMagasin(dto);
  }

  // Get all stores
  // This method retrieves all stores from the database, including their associated reviews, products, and visitors.
  @Get()
  async findAll(): Promise<Magasin[]> {
    return this.magasinService.getAllMagasins();
  }

  // Get a store by ID
  // This method retrieves a specific store by its ID, including its associated reviews, products, and visitors.
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Magasin> {
    return this.magasinService.getMagasinById(+id);
  }

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

  // Update a store by ID
  // This method updates a specific store with the provided data and associates it with the specified product, review, and visitor.
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateMagasinDto,
  ): Promise<Magasin> {
    return this.magasinService.updateMagasin(+id, dto);
  }

  // Delete a store by ID
  // This method deletes a specific store by its ID.
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.magasinService.deleteMagasin(+id);
    return { message: 'Magasin supprimé avec succès' };
  }
}
