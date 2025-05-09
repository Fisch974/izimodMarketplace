// avis-utilisateur/dto/create-avis-utilisateur.dto.ts
import {
    IsBoolean,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
  
export class CreateAvisUtilisateurDto {

    @IsString()
    @IsNotEmpty()
    commentaire: string;
  
    @IsDateString()
    @IsOptional()
    date?: string;
  
    @IsInt()
    @Min(1)
    @Max(5)
    note: number;
  
    @IsBoolean()
    visible: boolean;
  
    @IsOptional()
    utilisateur_id?: number;
  
    @IsNotEmpty()
    magasin_id: number;
  
    @IsNotEmpty()
    produit_id: number;
}
  
