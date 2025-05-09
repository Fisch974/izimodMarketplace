import { Controller, Get } from '@nestjs/common';
import { MagasinService } from './magasin.service';

@Controller()
export class MagasinController {
  constructor(private readonly appService: MagasinService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}