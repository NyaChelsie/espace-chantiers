import { Injectable, signal } from '@angular/core';

export type TypeNotification = 'info' | 'succès' | 'erreur';

export interface MessageNotification {
  texte: string;
  type: TypeNotification;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _message = signal<MessageNotification | null>(null);
  readonly message = this._message.asReadonly();

  private minuterie?: ReturnType<typeof setTimeout>;

  afficher(texte: string, type: TypeNotification = 'info'): void {
    clearTimeout(this.minuterie);
    this._message.set({ texte, type });
    this.minuterie = setTimeout(() => this.effacer(), 4000);
  }

  effacer(): void {
    clearTimeout(this.minuterie);
    this._message.set(null);
  }
}
