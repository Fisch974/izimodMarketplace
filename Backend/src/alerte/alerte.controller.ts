import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { AlerteService } from './alerte.service';

// This controller handles requests related to alerts in the application.
// It provides endpoints to create, retrieve, and update alerts.
@Controller('alertes')
export class AlerteController {
  constructor(private readonly alerteService: AlerteService) {}

  @Get()
  getAll() {
    return this.alerteService.getAllAlertes();
  }

  @Get('utilisateur/:id')
  getByUtilisateur(@Param('id') id: string) {
    return this.alerteService.getAlertesByUtilisateurId(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    return this.alerteService.createAlerte({
      type: body.type,
      message: body.message,
      statut: body.statut === 'Traité' ? 'Traité' : 'Non lu', // ici le cast
      utilisateur: body.utilisateur, // facultatif
    });
  }

  @Patch(':id/statut')
  updateStatut(@Param('id') id: string, @Body('statut') statut: string) {
    if (statut !== 'Traité' && statut !== 'Non lu') {
      throw new Error('Statut invalide');
    }
    return this.alerteService.updateStatut(Number(id), statut as 'Traité' | 'Non lu');
  }
}
