
import {
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsInt,
} from 'class-validator';


// This DTO (Data Transfer Object) is used for creating a new store (Magasin).
// It contains validation rules for the fields that are required when creating a new store.
export class CreateMagasinDto {

    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsString()
    @IsNotEmpty()
    telephone: string;

    @IsDateString()
    @IsNotEmpty()
    creerLe: Date;
  
    @IsNotEmpty()
    @IsInt()
    utilisateurId: number; // pour associer au vendeur
}