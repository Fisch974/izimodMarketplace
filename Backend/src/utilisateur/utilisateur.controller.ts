import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './create_Utilisateur.dto';
import { UpdateUtilisateurDto } from './update-utilisateur.dto';
import { Utilisateur } from './utilisateur.entity';


@Controller('utilisateurs')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  async create(@Body() createDto: CreateUtilisateurDto): Promise<Utilisateur> {
    return this.utilisateurService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.utilisateurService.findAll(); // Renvoie des objets sans motDePasse
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.utilisateurService.findOne(id); // Renvoie un utilisateur "public"
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    return this.utilisateurService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.utilisateurService.remove(id);
  }
}