import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Produit } from './produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';





@Module({
  imports: [TypeOrmModule.forFeature([Produit])],
  controllers: [ProduitController],
  providers: [ProduitService],
  exports: [TypeOrmModule],
})
export class ProduitModule {}