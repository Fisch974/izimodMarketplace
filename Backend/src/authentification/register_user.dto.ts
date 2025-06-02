import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  prenom: string;

  @IsNotEmpty()
  adresse: string;

  @IsEmail()
  mail: string;

  @MinLength(6)
  motDePasse: string;

  @IsNotEmpty()
  role: string;
}
