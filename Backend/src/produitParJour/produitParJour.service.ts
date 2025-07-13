import { Injectable } from '@nestjs/common';

@Injectable()
export class ProduitParJourService {
  getHello(): string {
    return 'Hello World!';
  }
}