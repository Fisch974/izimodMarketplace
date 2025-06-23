
import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

// This DTO (Data Transfer Object) is used for creating a new product (Produit).
// It contains validation rules for the fields that are required when creating a new product.
export class CreateProduitDto {

    @IsString()
    @IsNotEmpty()
    designation: string;

    @IsNumber()
    @IsNotEmpty()
    prix: number;

    @IsNumber()
    @IsOptional()
    stock?: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    dateAjout: Date;

    @IsString()
    @IsNotEmpty()
    categorie: string;


    @IsString()
    @IsOptional()
    imagePath?: string;


    @IsInt()
    @IsOptional()
    avisUtilisateur_id?: number;


    @IsNotEmpty()
    magasin_id: number;

}