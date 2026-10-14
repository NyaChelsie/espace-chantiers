import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { StatutDirective } from '../../directives/statut.directive';
import { ChantierService } from '../../services/chantier.service';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-suivi',
  imports: [StatutDirective],
  template: `
    <h2 class="text-xl font-semibold">Suivi de vos chantiers</h2>
    <p class="text-sm text-slate-600">Section : {{ section }}</p>

    <p class="mt-3">Demandes de devis envoyées : {{ devis.nombre() }}</p>

    <ul class="mt-3 space-y-2">
      @for (c of enCours(); track c.numero) {
        <li class="rounded border p-3">
          <p class="font-semibold">{{ c.titre }}</p>
          <span [appStatut]="c.statut">{{ c.statut }}</span>
          <span class="ml-2 text-sm">{{ c.avancement }} %</span>
        </li>
      }
    </ul>
  `,
})
export class Suivi {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(ChantierService);
  readonly devis = inject(DevisService);

  // Snapshot légitime : ce composant est recréé à chaque visite de l'onglet.
  readonly section = this.route.snapshot.url.map((segment) => segment.path).join('/');

  private readonly chantiers = toSignal(this.service.lister(), { initialValue: [] });
  readonly enCours = computed(() => this.chantiers().filter((c) => c.statut === 'en cours'));
}
