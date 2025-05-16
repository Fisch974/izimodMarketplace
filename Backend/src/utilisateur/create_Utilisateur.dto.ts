import { IsEmail, IsString, Length, IsOptional, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

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