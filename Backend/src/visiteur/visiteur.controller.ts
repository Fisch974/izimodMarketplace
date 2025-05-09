import { Controller, Get } from '@nestjs/common';
import { VisiteurService } from './visiteur.service';

@Controller()
export class VisiteurController {
  constructor(private readonly appService: VisiteurService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}