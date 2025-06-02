import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './create_Utilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {}
