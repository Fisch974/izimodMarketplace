
import { Injectable } from '@nestjs/common';

@Injectable()
export class VisiteurService {
  getHello(): string {
    return 'Hello World!';
  }
}