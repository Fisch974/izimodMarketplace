import { Controller, Get } from '@nestjs/common';
import { AvisUtilisateurService } from './avisUtilisateur.service';

@Controller()
export class AvisUtilisateurController {
  constructor(private readonly appService: AvisUtilisateurService) {}


}