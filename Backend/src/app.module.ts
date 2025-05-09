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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'azerty',
      database: 'izimod_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UtilisateurModule,
    RoleModule,
    MagasinModule,
    ProduitModule,
    ProduitParJourModule,
    PaiementModule,
    TransactionModule,
    AvisUtilisateurModule,
    VisiteurModule,
    AlerteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
