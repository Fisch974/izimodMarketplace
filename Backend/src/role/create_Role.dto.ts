import { IsString, Length } from 'class-validator';

// This DTO (Data Transfer Object) is used for creating a new role.
// It contains validation rules for the fields that are required when creating a new role.
export class CreateRoleDto {
  @IsString()
  @Length(2, 50)
  nom!: string;
}
