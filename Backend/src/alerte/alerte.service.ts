import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerte } from './alerte.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';


// Service for managing alerts
// This service provides methods to create, retrieve, and update alerts
@Injectable()
export class AlerteService {
  constructor(
    @InjectRepository(Alerte)
    private readonly alerteRepository: Repository<Alerte>,
  ) {}

  // Create a new alert
  // The method accepts an object containing the alert's type, message, status, date, and user
  async createAlerte(data: {
    type: string;
    message: string;
    statut?: 'Non lu' | 'Traité';
    date?: Date;
    utilisateur?: Utilisateur;
  }): Promise<Alerte> {
    const alerte = this.alerteRepository.create({
      ...data,
      statut: data.statut || 'Non lu',
      date: data.date || new Date(),
    });
    return this.alerteRepository.save(alerte);
  }

  // Retrieve all alerts
  // The method returns a promise that resolves to an array of alerts
  async getAllAlertes(): Promise<Alerte[]> {
    return this.alerteRepository.find({
      relations: ['utilisateur'],
      order: { date: 'DESC' },
    });
  }

  // Retrieve alerts by user ID
  // The method accepts a user ID and returns a promise that resolves to an array of alerts for that user
  async getAlertesByUtilisateurId(utilisateurId: number): Promise<Alerte[]> {
    return this.alerteRepository.find({
      where: { utilisateur: { id: utilisateurId } },
      relations: ['utilisateur'],
      order: { date: 'DESC' },
    });
  }

  // Update the status of an alert
  // The method accepts an alert ID and a new status, and returns the updated alert
  async updateStatut(id: number, statut: 'Non lu' | 'Traité'): Promise<Alerte> {
    const alerte = await this.alerteRepository.findOne({ where: { id } });
    if (!alerte) {
      throw new Error('Alerte non trouvée');
    }
    alerte.statut = statut;
    return this.alerteRepository.save(alerte);
  }
}
