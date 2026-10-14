import { Injectable, computed, signal } from '@angular/core';

export type Role = 'client' | 'admin';

export interface Utilisateur {
  nom: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _utilisateur = signal<Utilisateur | null>(null);

  readonly utilisateur = this._utilisateur.asReadonly();
  readonly connecte = computed(() => this._utilisateur() !== null);
  readonly role = computed(() => this._utilisateur()?.role ?? null);
  readonly estAdmin = computed(() => this._utilisateur()?.role === 'admin');

  connecterClient(): void {
    this._utilisateur.set({ nom: 'Client', role: 'client' });
  }

  connecterAdmin(): void {
    this._utilisateur.set({ nom: 'Administrateur', role: 'admin' });
  }

  deconnecter(): void {
    this._utilisateur.set(null);
  }
}
