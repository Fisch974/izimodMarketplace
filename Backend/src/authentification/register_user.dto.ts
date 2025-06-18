import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class RegisterUserDto {

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  nom: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  prenom: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  adresse: string;

  @Transform(({ value }) => sanitizeHtml(value))
  @IsEmail({}, { message: 'Adresse email invalide' })
  mail: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Le mot de passe doit contenir au moins une lettre et un chiffre',
  })
  motDePasse: string;

  @IsNotEmpty()
  @IsIn(['utilisateur', 'vendeur'], { message: 'Rôle invalide' })
  role: string;
}
