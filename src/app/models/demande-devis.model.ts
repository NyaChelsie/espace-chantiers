import { TypeTravaux } from './chantier.model';

export interface DemandeDevis {
  numero: number;
  date: Date;
  type: TypeTravaux;
  description: string;
  budgetEstime: number;
  chantierRef?: number;
}
