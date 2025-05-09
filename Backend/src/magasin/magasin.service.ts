import { Injectable } from '@nestjs/common';

@Injectable()
export class MagasinService {
  getHello(): string {
    return 'Hello World!';
  }
}