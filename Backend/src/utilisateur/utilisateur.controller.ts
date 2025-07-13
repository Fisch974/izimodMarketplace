import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards, Req, Request,
  ForbiddenException
} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './create_Utilisateur.dto';
import { UpdateUtilisateurDto } from './update-utilisateur.dto';
import { Utilisateur } from './utilisateur.entity';
import { JwtAuthGuard } from '../authentification/jwt-auth.guard';


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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    const id = req.user.userId;
    return this.utilisateurService.findOne(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.utilisateurService.findOne(id); // Renvoie un utilisateur "public"
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUtilisateurDto,
    @Request() req,
  ): Promise<Utilisateur> {
    if (req.user.userId !== id && req.user.role !== 'admin') {
      throw new ForbiddenException("Vous n'avez pas le droit de modifier cet utilisateur.");
    }
    return this.utilisateurService.update(id, updateDto);
  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.utilisateurService.remove(id);
  }

  


}