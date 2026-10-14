import { Component, inject } from '@angular/core';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-admin-demandes',
  template: `
    <h2 class="text-xl font-semibold">Demandes de devis ({{ devis.nombre() }})</h2>

    @if (devis.demandes().length === 0) {
      <p class="mt-3 text-slate-600">Aucune demande pour le moment.</p>
    } @else {
      <ul class="mt-3 space-y-3">
        @for (d of devis.demandes(); track d.numero) {
          <li class="rounded border p-3">
            <p class="font-semibold">
              Demande n° {{ d.numero }} · {{ d.type }}
              @if (d.chantierRef) {
                · réf. chantier {{ d.chantierRef }}
              }
            </p>
            <p class="text-sm text-slate-600">
              {{ d.date.toLocaleDateString('fr-FR') }} ·
              {{ d.budgetEstime.toLocaleString('fr-FR') }} FCFA
            </p>
            <p class="mt-1">{{ d.description }}</p>
          </li>
        }
      </ul>
    }
  `,
})
export class AdminDemandes {
  readonly devis = inject(DevisService);
}
