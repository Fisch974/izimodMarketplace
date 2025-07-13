import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitParJourService } from './produitParJour.service';
import { ProduitParJourController } from './produitParJour.controller';
import { ProduitParJour } from './produitParJour.entity';






@Module({
  imports: [TypeOrmModule.forFeature([ProduitParJour])],
  controllers: [ProduitParJourController],
  providers: [ProduitParJourService],
  exports: [TypeOrmModule],
})
export class ProduitParJourModule {}