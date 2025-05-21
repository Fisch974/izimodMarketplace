import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(mail: string, pass: string): Promise<any> {
    const user = await this.utilisateurService.findByEmailWithPassword(mail);

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }   

    if (user && await bcrypt.compare(pass, user.motDePasse)) {
      const { motDePasse, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Identifiants invalides');
  }

  async login(user: any) {
  const payload = { sub: user.id, role: user.role.nom }; 
  return {
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      mail: user.mail,
      role: user.role.nom,
    },
  };
}

}
