import { Component, computed, inject, input } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SeulementPourDirective } from '../../directives/seulement-pour.directive';
import { StatutDirective } from '../../directives/statut.directive';
import { Chantier } from '../../models/chantier.model';
import { ChantierService } from '../../services/chantier.service';

@Component({
  selector: 'app-fiche-chantier',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SeulementPourDirective, StatutDirective],
  template: `
    <p class="text-sm text-slate-600">Chantier n° {{ numero() }}</p>
    <h1 class="text-3xl font-bold">{{ chantier().titre }}</h1>

    <div class="mt-3 space-y-1">
      <p class="text-slate-600">{{ chantier().type }}</p>
      <span [appStatut]="chantier().statut">{{ chantier().statut }}</span>
      <p>Avancement : {{ chantier().avancement }} %</p>
      <div class="h-2 w-64 rounded bg-slate-200">
        <div class="h-2 rounded bg-slate-800" [style.width.%]="chantier().avancement"></div>
      </div>
      <p>Budget : {{ chantier().budget.toLocaleString('fr-FR') }} FCFA</p>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <button
        class="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
        [disabled]="!aPrecedent()"
        (click)="aller('precedent')"
      >
        ← Chantier précédent
      </button>
      <button
        class="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
        [disabled]="!aSuivant()"
        (click)="aller('suivant')"
      >
        Chantier suivant →
      </button>

      <a
        *appSeulementPour="['client', 'admin']"
        class="rounded bg-slate-800 px-3 py-1 text-white"
        [routerLink]="['/espace-client', 'demande-devis']"
        [queryParams]="{ chantier: numero() }"
      >
        Demander un devis similaire
      </a>
    </div>

    <nav class="mt-6 flex gap-4 border-b">
      <a
        routerLink="details"
        routerLinkActive="border-b-2 border-slate-800 font-bold"
        class="pb-2"
      >
        Détails
      </a>
      <a
        routerLink="galerie"
        routerLinkActive="border-b-2 border-slate-800 font-bold"
        class="pb-2"
      >
        Galerie
      </a>
    </nav>

    <section class="mt-4">
      <router-outlet />
    </section>

    <button class="mt-6 rounded border px-3 py-1" (click)="retour()">
      Retour aux réalisations
    </button>
  `,
})
export class FicheChantier {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ChantierService);

  // Reçu du resolver grâce à withComponentInputBinding (même nom que la clé « chantier »)
  readonly chantier = input.required<Chantier>();

  readonly numero = computed(() => this.chantier().numero);
  readonly aPrecedent = computed(() => this.service.voisin(this.numero(), 'precedent') !== null);
  readonly aSuivant = computed(() => this.service.voisin(this.numero(), 'suivant') !== null);

  aller(sens: 'precedent' | 'suivant'): void {
    const voisin = this.service.voisin(this.numero(), sens);
    if (voisin === null) {
      return;
    }
    const onglet = this.route.snapshot.firstChild?.url[0]?.path ?? 'details';
    this.router.navigate(['..', voisin, onglet], { relativeTo: this.route });
  }

  retour(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
