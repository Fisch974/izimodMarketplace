import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This guard is used to protect routes that require JWT authentication.
// It extends the AuthGuard from NestJS Passport and uses the 'jwt' strategy.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
