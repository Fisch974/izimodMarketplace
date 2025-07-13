import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Repository } from 'typeorm';
import { Role } from 'src/role/role.entity';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { RoleService } from 'src/role/role.service';




@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Utilisateur)
    private utilisateurRepo: Repository<Utilisateur>,
  ) {
    // 👇 Initialisation correcte ici
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  generateJwt(user: Utilisateur) {
    const payload = {
      sub: user.id,
      email: user.mail,
      role: user.role?.nom || 'utilisateur', // protection ici
    };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      user,
    };
  }



  async validateUser(mail: string, pass: string): Promise<any> {
    const user = await this.utilisateurService.findByEmail(mail);

    if (!user) throw new UnauthorizedException('Utilisateur non trouvé');

    const isValid = await bcrypt.compare(pass, user.motDePasse);
    if (!isValid) throw new UnauthorizedException('Identifiants invalides');

    const { motDePasse, ...result } = user;
    return result;
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

  async findGoogleUserByEmail(mail: string) {
    const user = await this.utilisateurService.findByEmail(mail);
    if (!user) throw new UnauthorizedException('Utilisateur non trouvé');
    
    return user;
  }

  async registerGoogleUser(idToken: string, roleName: string) {
    const ticket = await (this.googleClient as any).verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
    });


    const payload = ticket.getPayload() as TokenPayload & {
      nbf?: number;
      exp?: number;
      iat?: number;
    };


    if (!payload) throw new UnauthorizedException("Token Google invalide");

    const { email, given_name, family_name } = payload;

    const existing = await this.utilisateurRepo.findOne({ where: { mail: email }, relations: ['role'] });
    if (existing) {
      return this.generateJwt(existing);
    }

    const role = await this.roleRepo.findOne({ where: { nom: roleName } });
    if (!role) throw new NotFoundException(`Rôle "${roleName}" introuvable`);

    const newUser = this.utilisateurRepo.create({
      nom: family_name || "Nom",
      prenom: given_name || "Prénom",
      adresse: "Adresse inconnue",
      mail: email,
      motDePasse: "",
      dateCreation: new Date().toISOString().split('T')[0],
      role,
    });

    await this.utilisateurRepo.save(newUser);

    const fullUser = await this.utilisateurRepo.findOne({
      where: { id: newUser.id },
      relations: ['role'],
    });

    if (!fullUser) throw new NotFoundException(`Utilisateur introuvable après création`);

    return this.generateJwt(fullUser);
  }

  async loginGoogleUser(idToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new UnauthorizedException("Token Google invalide");

      const { email } = payload;

      const user = await this.utilisateurRepo.findOne({ where: { mail: email }, relations: ['role'] });

      if (user) {
        return this.generateJwt(user);
      }

      // Il n'existe pas encore
      return { needRole: true };
    } catch (err) {
      console.error("Erreur Google Login:", err);
      throw new InternalServerErrorException("Erreur lors de la connexion Google");
    }
  }

  async register(nom: string, prenom: string, adresse: string, mail: string, motDePasse: string, role: string) {
    try {

      const existingUser = await this.utilisateurRepo.findOne({ where: { mail } });
      if (existingUser) {
        throw new ConflictException("Un utilisateur avec cet email existe déjà.");
      }

      const hashedPassword = await bcrypt.hash(motDePasse, 10);
      const roleId = await this.roleService.findByName(role)
      const newUser = this.utilisateurRepo.create({
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        mail: mail,
        motDePasse: hashedPassword,
        dateCreation: new Date().toISOString().split('T')[0],
        role: roleId,
      });

      


      await this.utilisateurRepo.save(newUser);

      if (newUser) {
        return this.generateJwt(newUser)
      }
    } catch (err) {
      console.error("Erreur lors de l'enregistrement du nouvel utilisateur :", err.message);
      throw new InternalServerErrorException("Erreur lors de l'inscription de l'utilisateur.");
    }

  }

}

