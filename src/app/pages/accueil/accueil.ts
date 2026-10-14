import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChantierService } from '../../services/chantier.service';

@Component({
  selector: 'app-accueil',
  template: `
       <section class="bg-[url('/images/hero.jpg')] bg-cover bg-center">
      <div class="bg-black/55 px-6 py-20 text-center text-white">
        <h1 class="text-4xl font-bold">ETS de l'Éternel Bâti</h1>
        <p class="mt-3 text-lg">
          Finitions, rénovations et génie civil : découvrez nos réalisations et suivez vos chantiers.
        </p>
      </div>
    </section>

    <div class="mt-6 flex items-center gap-2">
      <label for="numero">Ouvrir le chantier n°</label>
      <input #champ id="numero" type="number" class="rounded border px-2 py-1" />
      <button
        class="rounded bg-slate-800 px-3 py-1 text-white"
        (click)="ouvrir(champ.value)"
      >
        Ouvrir
      </button>
    </div>
  `,
})
export class Accueil {
  private readonly router = inject(Router);
  private readonly service = inject(ChantierService);

  ouvrir(saisie: string): void {
    const numero = Number(saisie);

    if (saisie.trim() === '' || !Number.isInteger(numero)) {
      this.router.navigateByUrl('/introuvable');
      return;
    }

    if (numero >= 1 && numero <= this.service.compter()) {
      this.router.navigate(['/realisations', numero]);
    } else {
      this.router.navigateByUrl('/introuvable', { browserUrl: `/realisations/${numero}` });
    }
  }
}
