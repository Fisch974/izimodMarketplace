import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';





// This module is responsible for managing roles (Role).
// It imports the necessary entities and services, and sets up the controller and service for handling requests
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