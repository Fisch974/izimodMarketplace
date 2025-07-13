
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';


// This DTO (Data Transfer Object) is used for creating a new store (Magasin).
// It contains validation rules for the fields that are required when creating a new store.
export class CreatePaiementDto {

    @IsNumber()
    @IsNotEmpty()
    montant: number;
  
    @IsDateString()
    @IsNotEmpty()
    date: string;
  
    @IsString()
    @IsNotEmpty()
    statut: string;
    
    @IsString()
    @IsNotEmpty()
    mode: string;


    @IsNotEmpty()
    utilisateur_id: number;
  

    @IsNotEmpty()
    produit_id: number;

    @IsNotEmpty()
    transaction_id: number;

}