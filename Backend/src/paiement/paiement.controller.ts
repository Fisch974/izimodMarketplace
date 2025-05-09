import { Controller, Get } from '@nestjs/common';
import { PaiementService } from './paiement.service';

@Controller()
export class PaiementController {
  constructor(private readonly appService: PaiementService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}