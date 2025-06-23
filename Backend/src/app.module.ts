import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { RoleModule } from './role/role.module';
import { MagasinModule } from './magasin/magasin.module';
import { ProduitModule } from './produit/produit.module';
import { ProduitParJourModule } from './produitParJour/produitParJour.module';
import { PaiementModule } from './paiement/paiement.module';
import { TransactionModule } from './transaction/transaction.module';
import { AvisUtilisateurModule } from './avisUtilisateur/avisUtilisateur.module';
import { VisiteurModule } from './visiteur/visiteur.module';
import { AlerteModule } from './alerte/alerte.module';
import { AuthModule } from './authentification/auth.module';
import { JwtModule } from '@nestjs/jwt';


// This is the main application module for a NestJS application.
// It imports various modules such as ConfigModule for configuration management, TypeOrmModule for database interactions
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      username: 'root',
      password: 'azerty',
      database: 'izimod_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    RoleModule,
    UtilisateurModule,
    MagasinModule,
    ProduitModule,
    ProduitParJourModule,
    PaiementModule,
    TransactionModule,
    AvisUtilisateurModule,
    VisiteurModule,
    AlerteModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
