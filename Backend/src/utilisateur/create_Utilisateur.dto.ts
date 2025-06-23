import { IsEmail, IsString, Length, IsOptional, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

// This DTO (Data Transfer Object) is used for creating a new user.
// It contains validation rules for the fields that are required when creating a new user.
export class CreateUtilisateurDto {
  @IsString()
  @Length(1, 30)
  nom!: string;

  @IsString()
  @Length(1, 30)
  prenom!: string;
 
  @IsString()
  adresse!: string;

  @IsEmail()
  mail!: string;

  @IsDateString()
  @IsNotEmpty()
  dateCreation!: string;

  @IsString()
  motDePasse!: string;

  @IsNotEmpty()
  @IsNumber()
  roleId!: number;

  @IsOptional()
  @IsNumber()
  magasinId?: number;
}