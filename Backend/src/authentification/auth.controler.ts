import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { mail: string; motDePasse: string }) {
    const user = await this.authService.validateUser(body.mail, body.motDePasse);
    return this.authService.login(user);
  }
}
