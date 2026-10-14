import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { Chantier } from '../models/chantier.model';

@Injectable({ providedIn: 'root' })
export class ChantierService {
  private readonly chantiers: Chantier[] = [
    {
      numero: 1,
      titre: 'Villa R+1 « Les Acacias »',
      type: 'Finition',
      statut: 'terminé',
      avancement: 100,
      budget: 18500000,
      photos: 8,
      description:
        "Finition complète d'une villa R+1 : enduits, faux plafonds, électricité et peinture. Le chantier a été livré dans les délais, avec une réception sans réserve.",
    },
    {
      numero: 2,
      titre: 'Rénovation de l\'immeuble « Horizon »',
      type: 'Rénovation',
      statut: 'en cours',
      avancement: 60,
      budget: 12000000,
      photos: 6,
      description:
        "Rénovation de la façade, de la toiture et des parties communes de l'immeuble. Les travaux avancent par niveaux pour que les occupants restent sur place.",
    },
    {
      numero: 3,
      titre: 'Dalot du quartier « Les Manguiers »',
      type: 'Génie civil',
      statut: 'planifié',
      avancement: 0,
      budget: 7800000,
      photos: 3,
      description:
        "Construction d'un dalot pour évacuer les eaux de pluie du quartier. Le démarrage est prévu après la fin de la saison des pluies.",
    },
    {
      numero: 4,
      titre: 'Clôture de la résidence « Éden »',
      type: 'Gros œuvre',
      statut: 'en cours',
      avancement: 35,
      budget: 4200000,
      photos: 5,
      description:
        "Édification d'un mur de clôture en agglos avec fondations et chaînages. Un portail et un portillon seront posés une fois le gros œuvre terminé.",
    },
    {
      numero: 5,
      titre: 'Carrelage et peinture, villa « Beausoleil »',
      type: 'Finition',
      statut: 'en cours',
      avancement: 80,
      budget: 2600000,
      photos: 7,
      description:
        "Pose du carrelage dans toutes les pièces puis peinture intérieure et extérieure. Il reste les finitions des angles et le nettoyage de fin de chantier.",
    },
  ];

  lister(): Observable<Chantier[]> {
    return of(this.chantiers).pipe(delay(300));
  }

  trouver(numero: number): Observable<Chantier> {
    const chantier = this.chantiers.find((c) => c.numero === numero);
    if (!chantier) {
      return throwError(() => new Error(`Chantier n° ${numero} introuvable`));
    }
    return of(chantier).pipe(delay(500));
  }

  compter(): number {
    return this.chantiers.length;
  }

  voisin(numero: number, sens: 'precedent' | 'suivant'): number | null {
    const cible = sens === 'suivant' ? numero + 1 : numero - 1;
    return this.chantiers.some((c) => c.numero === cible) ? cible : null;
  }
}
