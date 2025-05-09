import { Controller, Get } from '@nestjs/common';
import { ProduitService } from './produit.service';

@Controller()
export class ProduitController {
  constructor(private readonly appService: ProduitService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}