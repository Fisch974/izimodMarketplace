
import {
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
} from 'class-validator';


// This DTO (Data Transfer Object) is used for creating a new store (Magasin).
// It contains validation rules for the fields that are required when creating a new store.
export class CreateMagasinDto {

    @IsString()
    @IsNotEmpty()
    nom: string;
  
    @IsDateString()
    @IsNotEmpty()
    creerLe: string;
  
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    visiteur_id: number;

    @IsNotEmpty()
    produit_id: number;

    @IsNotEmpty()
    avisUtilisateur_id: number;
}