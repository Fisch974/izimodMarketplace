import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paiement } from './paiement.entity';
import { PaiementController } from './paiement.controller';
import { PaiementService } from './paiement.service';





@Module({
  imports: [TypeOrmModule.forFeature([Paiement])],
  controllers: [PaiementController],
  providers: [PaiementService],
  exports: [TypeOrmModule],
})
export class PaiementModule {}