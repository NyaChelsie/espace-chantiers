import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { StatutDirective } from '../../directives/statut.directive';
import { StatutChantier } from '../../models/chantier.model';
import { ChantierService } from '../../services/chantier.service';

@Component({
  selector: 'app-realisations',
  imports: [RouterLink, StatutDirective],
  template: `
    <h1 class="text-3xl font-bold">Nos réalisations</h1>

    <div class="mt-4 flex flex-wrap gap-2">
      <button class="rounded border px-3 py-1" (click)="filtrer(null)">Tous</button>
      <button class="rounded border px-3 py-1" (click)="filtrer('planifié')">Planifié</button>
      <button class="rounded border px-3 py-1" (click)="filtrer('en cours')">En cours</button>
      <button class="rounded border px-3 py-1" (click)="filtrer('terminé')">Terminé</button>
    </div>

    <p class="mt-3 text-sm text-slate-600">{{ affiches().length }} chantier(s) affiché(s)</p>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
           @for (c of affiches(); track c.numero) {
        <a
          [routerLink]="['/realisations', c.numero]"
          class="block rounded border p-4 hover:bg-slate-50"
        >
          <img [src]="'images/chantier-' + c.numero + '.jpg'" [alt]="c.titre">
          <h2 class="text-lg font-semibold">{{ c.titre }}</h2>
          <p class="text-sm text-slate-600">{{ c.type }}</p>
          <span [appStatut]="c.statut" class="mt-2">{{ c.statut }}</span>
        </a>
      }
    </div>
  `,
})
export class Realisations {
  private readonly service = inject(ChantierService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly chantiers = toSignal(this.service.lister(), { initialValue: [] });

  readonly statut = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('statut'))),
    { initialValue: this.route.snapshot.queryParamMap.get('statut') },
  );

  readonly affiches = computed(() => {
    const statut = this.statut();
    const tous = this.chantiers();
    return statut ? tous.filter((c) => c.statut === statut) : tous;
  });

  filtrer(statut: StatutChantier | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { statut },
    });
  }
}
