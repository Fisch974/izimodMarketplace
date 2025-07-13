
// src/seed.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleService } from './role/role.service';
import { UtilisateurService } from './utilisateur/utilisateur.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const rolesService = app.get(RoleService);
  const utilisateurService = app.get(UtilisateurService);

  // Étape 1 : Créer les rôles
  const adminRole = await rolesService.create({ nom: 'admin' });
  const userRole = await rolesService.create({ nom: 'utilisateur' });

  
  const utilisateurs = [
        {
          nom: 'Dupont',
          prenom: 'Jean',
          adresse: '123 rue Exemple',
          mail: 'utilisateur@example.com',
          motDePasse: 'password123',
          roleName: 'utilisateur',
        },
        {
          nom: 'Martin',
          prenom: 'Claire',
          adresse: '456 avenue Vente',
          mail: 'vendeur@example.com',
          motDePasse: 'vendeur456',
          roleName: 'vendeur',
        },
        {
          nom: 'Durand',
          prenom: 'Alice',
          adresse: '789 boulevard Admin',
          mail: 'admin@admin.fr',
          motDePasse: 'admin789',
          roleName: 'admin',
        }
      ];
  
      for (const u of utilisateurs) {
        const exists = await this.utilisateurRepo.findOne({ where: { mail: u.mail } });
        if (exists) continue;
  
        const role = await this.roleRepository.findOne({ where: { nom: u.roleName } });
        if (!role) {
          console.warn(`⚠️ Rôle "${u.roleName}" introuvable`);
          continue;
        }
  
        const hashedPassword = await bcrypt.hash(u.motDePasse, 10);
  
        const newUser = this.utilisateurRepo.create({
          nom: u.nom,
          prenom: u.prenom,
          adresse: u.adresse, 
          mail: u.mail,
          motDePasse: hashedPassword,
          dateCreation: new Date().toISOString().split('T')[0],
          role,
        });
  
        await this.utilisateurRepo.save(newUser);
        console.log(`✅ Utilisateur "${u.mail}" créé avec le rôle "${u.roleName}"`);
      }

  await app.close();
}

bootstrap();
