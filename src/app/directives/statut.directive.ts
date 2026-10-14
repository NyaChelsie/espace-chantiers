import { Directive, computed, input } from '@angular/core';
import { StatutChantier } from '../models/chantier.model';

@Directive({
  selector: '[appStatut]',
  host: {
    '[class]': 'classes()',
    '[attr.title]': 'infobulle()',
  },
})
export class StatutDirective {
  readonly appStatut = input.required<StatutChantier>();

  readonly classes = computed(() => {
    const base = 'inline-block rounded-full px-3 py-1 text-sm font-medium ';
    switch (this.appStatut()) {
      case 'planifié':
        return base + 'bg-blue-100 text-blue-800';
      case 'en cours':
        return base + 'bg-amber-100 text-amber-800';
      case 'terminé':
        return base + 'bg-green-100 text-green-800';
    }
  });

  readonly infobulle = computed(() => `Statut : ${this.appStatut()}`);
}
