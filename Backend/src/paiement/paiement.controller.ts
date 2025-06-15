import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards
} from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './create_Paiement.dto';
import { Paiement } from './paiement.entity';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';

@Controller('paiements')
export class PaiementController {
  constructor(private readonly paiementService: PaiementService) {}

  @UseGuards(JwtAuthGuard)
  // Endpoint to create a new payment
  // It accepts a CreatePaiementDto object in the request body
  @Post()
  async create(@Body() dto: CreatePaiementDto): Promise<Paiement> {
    return this.paiementService.createPaiement(dto);
  }

  @UseGuards(JwtAuthGuard)
  // Endpoint to get all payments
  // It returns an array of Paiement objects
  @Get('all')
  async findAll(): Promise<Paiement[]> {
    return this.paiementService.getAllPaiements();
  }

  @UseGuards(JwtAuthGuard)
  // Endpoint to get a payment by its ID
  // It accepts an ID as a parameter and returns the corresponding Paiement object
  @Get('all/:id')
  async findById(@Param('id') id: number): Promise<Paiement> {
    return this.paiementService.getPaiementById(id);
  }

  @UseGuards(JwtAuthGuard)
  // Endpoints to get payments by user ID and product ID
  // These endpoints accept an ID as a parameter and return an array of Paiement objects
  @Get('all/produit/:id')
  async findByProduitId(@Param('id') id: number): Promise<Paiement[]> {
    return this.paiementService.getPaiementByProduitId(id);
  }

  @UseGuards(JwtAuthGuard)
  // Endpoint to get payments by user ID
  // It accepts an ID as a parameter and returns an array of Paiement objects
  @Get('all/utilisateur/:id')
  async findByUtilisateurId(@Param('id') id: number): Promise<Paiement[]> {
    return this.paiementService.getPaiementByUtilisateurId(id);
  }
}
