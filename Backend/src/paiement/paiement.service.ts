import { Injectable } from '@nestjs/common';

@Injectable()
export class PaiementService {
  getHello(): string {
    return 'Hello World!';
  }
}