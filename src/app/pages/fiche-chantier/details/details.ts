import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Chantier } from '../../../models/chantier.model';

@Component({
  selector: 'app-details',
  template: `
    <h2 class="text-xl font-semibold">Détails du chantier n° {{ chantier().numero }}</h2>
    <p class="mt-2">{{ chantier().description }}</p>
  `,
})
export class DetailsChantier {
  // La donnée résolue est dans la route PARENTE (le chemin « details » n'est pas vide)
  private readonly parent = inject(ActivatedRoute).parent!;

  readonly chantier = toSignal(
    this.parent.data.pipe(map((data) => data['chantier'] as Chantier)),
    { initialValue: this.parent.snapshot.data['chantier'] as Chantier },
  );
}
