import { Controller, Get } from '@nestjs/common';
import { ProduitParJourService } from './produitParJour.service';

@Controller()
export class ProduitParJourController {
  constructor(private readonly appService: ProduitParJourService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}