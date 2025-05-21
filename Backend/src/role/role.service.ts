import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './create_Role.dto';

@Injectable()
export class RoleService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepo.create(dto);
    return this.roleRepo.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) throw new NotFoundException(`Role ${id} introuvable`);
    return role;
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepo.remove(role);
  }

  // ✅ Changement ici
  async onApplicationBootstrap() {
    await this.seedRoles();
  }

  private async seedRoles() {
    const roles = ['utilisateur', 'vendeur', 'admin'];

    for (const nom of roles) {
      const existing = await this.roleRepo.findOne({ where: { nom } });
      if (!existing) {
        const role = this.roleRepo.create({ nom });
        await this.roleRepo.save(role);
        console.log(`✅ Rôle "${nom}" ajouté`);
      }
    }
  }
}

