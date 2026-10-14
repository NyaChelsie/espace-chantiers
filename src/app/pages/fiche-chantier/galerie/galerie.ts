import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Chantier } from '../../../models/chantier.model';

@Component({
  selector: 'app-galerie',
  template: `
    <h2 class="text-xl font-semibold">Galerie ({{ chantier().photos }} photos)</h2>
    <div class="mt-3 grid grid-cols-3 gap-3">
      @for (n of cases(); track n) {
        <div class="flex h-24 items-center justify-center rounded border bg-slate-100">
          {{ n }}
        </div>
      }
    </div>
  `,
})
export class GalerieChantier {
  private readonly parent = inject(ActivatedRoute).parent!;

  readonly chantier = toSignal(
    this.parent.data.pipe(map((data) => data['chantier'] as Chantier)),
    { initialValue: this.parent.snapshot.data['chantier'] as Chantier },
  );

  readonly cases = computed(() => Array.from({ length: this.chantier().photos }, (_, i) => i + 1));
}
