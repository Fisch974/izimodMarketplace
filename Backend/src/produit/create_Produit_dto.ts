
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';


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


    @IsNotEmpty()
    @IsOptional()
    avisUtilisateur_id?: number;


    @IsNotEmpty()
    magasin_id: number;

}