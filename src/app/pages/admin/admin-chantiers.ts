import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatutDirective } from '../../directives/statut.directive';
import { ChantierService } from '../../services/chantier.service';

@Component({
  selector: 'app-admin-chantiers',
  imports: [StatutDirective],
  template: `
    <h2 class="text-xl font-semibold">Tous les chantiers</h2>

    <table class="mt-3 w-full text-left text-sm">
      <thead>
        <tr class="border-b">
          <th class="py-2">N°</th>
          <th>Titre</th>
          <th>Type</th>
          <th>Statut</th>
          <th>Avancement</th>
          <th>Budget</th>
        </tr>
      </thead>
      <tbody>
        @for (c of chantiers(); track c.numero) {
          <tr class="border-b">
            <td class="py-2">{{ c.numero }}</td>
            <td>{{ c.titre }}</td>
            <td>{{ c.type }}</td>
            <td><span [appStatut]="c.statut">{{ c.statut }}</span></td>
            <td>{{ c.avancement }} %</td>
            <td>{{ c.budget.toLocaleString('fr-FR') }} FCFA</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class AdminChantiers {
  private readonly service = inject(ChantierService);
  readonly chantiers = toSignal(this.service.lister(), { initialValue: [] });
}
