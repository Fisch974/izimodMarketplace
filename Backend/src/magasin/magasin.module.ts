import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magasin } from './magasin.entity';
import { MagasinController } from './magasin.controller';
import { MagasinService } from './magasin.service';




@Module({
  imports: [TypeOrmModule.forFeature([Magasin])],
  controllers: [MagasinController],
  providers: [MagasinService],
  exports: [TypeOrmModule],
})
export class MagasinModule {}