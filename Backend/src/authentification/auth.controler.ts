import { Controller, Post, Body, Get, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private utilisateurService: UtilisateurService) {}

  @Post('login')
  async login(@Body() body: { mail: string; motDePasse: string }) {
    const user = await this.authService.validateUser(body.mail, body.motDePasse);
    return this.authService.login(user);
  }

  @Post('google/register')
  async registerWithGoogle(@Body() body: { idToken: string; role: string }) {
    return this.authService.registerGoogleUser(body.idToken, body.role);
  }

  @Post('google/login')
  async loginGoogleUser(@Body() body : {idToken: string}) {
    return this.authService.loginGoogleUser(body.idToken)
  }

  @Post('register')
  async registerUser(@Body() body: {nom: string, prenom: string, adresse: string, mail: string, motDePasse: string, role: string}) {
    return this.authService.register(body.nom, body.prenom, body.adresse, body.mail, body.motDePasse, body.role)
  }
}
