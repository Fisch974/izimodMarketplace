import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UtilisateurModule } from '../utilisateur/utilisateur.module';
import { AuthController } from './auth.controler';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { Role } from 'src/role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [
    UtilisateurModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
    TypeOrmModule.forFeature([
      Utilisateur,
      Role,
    ]),
  ],
  providers: [AuthService, JwtStrategy, RoleService],
  controllers: [AuthController],
})
export class AuthModule {}
