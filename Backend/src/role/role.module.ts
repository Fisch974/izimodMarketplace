import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';






@Module({
  imports: [
    TypeOrmModule.forFeature([Role,
      Utilisateur
    ])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}