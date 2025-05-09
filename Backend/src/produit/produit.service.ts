import { Injectable } from '@nestjs/common';

@Injectable()
export class ProduitService {
  getHello(): string {
    return 'Hello World!';
  }
}