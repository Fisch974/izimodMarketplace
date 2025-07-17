import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AvisUtilisateurService } from './avisUtilisateur.service';
import { AvisUtilisateur } from './avisUtilisateur.entity';
import { CreateAvisUtilisateurDto } from './create_Avis.dto';
import { Magasin } from '../magasin/magasin.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Produit } from '../produit/produit.entity';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';

// This module for managing user reviews (AvisUtilisateur).
// It imports the necessary entities and services, and sets up the controller and service for handling requests related to user reviews.
@Controller()
export class AvisUtilisateurController {
  constructor(private readonly appService: AvisUtilisateurService) {}

  @UseGuards(JwtAuthGuard)
  // Get all reviews
  @Get()
    getAllAvis(): Promise<AvisUtilisateur[]> {
      return this.appService.getAllAvis();
    }

  // Get reviews by store ID
  @Get('magasin/:id')
    getAvisByMagasinId(magasinId: number): Promise<AvisUtilisateur[]> {
      return this.appService.getAvisByMagasinId(magasinId);
    }

  @UseGuards(JwtAuthGuard)
  // Get reviews by product ID
  @Post('create')
    createAvis(dto: CreateAvisUtilisateurDto): Promise<AvisUtilisateur> {
      return this.appService.createAvis(dto);
    }

  @UseGuards(JwtAuthGuard)
  // Get reviews by user ID
  @Put('update/:id')
    updateAvis(
      @Param('id') id: number,
      @Body() dto: CreateAvisUtilisateurDto,
    ): Promise<AvisUtilisateur> {
      return this.appService.updateAvis(id, dto);
    }

  @UseGuards(JwtAuthGuard)
  // Delete a review by ID
  @Delete('delete/:id')
    deleteAvis(id: number): Promise<void> {   
      return this.appService.deleteAvis(id);
    }
    
  // Get a review by ID
  @Get(':id')
    getAvisById(@Param('id') id: number): Promise<AvisUtilisateur> {
      return this.appService.getAvisById(id);
    }
}