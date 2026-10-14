import { Injectable, computed, signal } from '@angular/core';
import { DemandeDevis } from '../models/demande-devis.model';

@Injectable({ providedIn: 'root' })
export class DevisService {
  private readonly _demandes = signal<DemandeDevis[]>([]);

  readonly demandes = this._demandes.asReadonly();
  readonly nombre = computed(() => this._demandes().length);

  ajouter(donnees: Omit<DemandeDevis, 'numero' | 'date'>): void {
    const demande: DemandeDevis = {
      ...donnees,
      numero: this._demandes().length + 1,
      date: new Date(),
    };
    this._demandes.update((liste) => [...liste, demande]);
  }
}
