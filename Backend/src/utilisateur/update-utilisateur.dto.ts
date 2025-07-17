import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './create_Utilisateur.dto';

// This Data Transfer Object (DTO) is used to update an existing user (Utilisateur).
// It extends the CreateUtilisateurDto, allowing partial updates to the user fields.
export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {}
