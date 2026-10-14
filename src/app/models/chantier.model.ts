export type StatutChantier = 'planifié' | 'en cours' | 'terminé';

export type TypeTravaux = 'Gros œuvre' | 'Finition' | 'Rénovation' | 'Génie civil';

export interface Chantier {
  numero: number;
  titre: string;
  type: TypeTravaux;
  statut: StatutChantier;
  avancement: number;
  budget: number;
  photos: number;
  description: string;
}
