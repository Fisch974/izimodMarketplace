import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// This strategy handles JWT authentication.
// It extracts the JWT from the Authorization header and validates it using the secret key.
export interface JwtPayload {
  sub: string;  
  role: string;  
  email?: string; 
}

// The JwtStrategy class extends PassportStrategy to implement JWT authentication.
// It uses the secret key from the ConfigService to verify the JWT and extracts the user information
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, 
      role: payload.role };
  }
}
