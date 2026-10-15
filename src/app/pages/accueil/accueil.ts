import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChantierService } from '../../services/chantier.service';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink],
  template: `
    <section class="bg-[url('/images/hero.jpg')] bg-cover bg-center">
      <div class="bg-black/60 px-6 py-24 text-white md:px-16 md:py-32">
        <div class="max-w-2xl">
          <h1 class="text-4xl font-extrabold uppercase leading-tight md:text-5xl">
            Finition &amp; rénovation
            <span class="text-amber-500">de qualité</span>
          </h1>
          <p class="mt-4 text-lg italic">
            Finitions, rénovations et génie civil : découvrez nos réalisations et suivez vos
            chantiers.
          </p>
          <a
            routerLink="/realisations"
            class="mt-8 inline-block rounded bg-amber-500 px-6 py-3 font-semibold text-black"
          >
            Voir nos réalisations
          </a>
        </div>
      </div>
    </section>

    <section class="relative z-10 -mt-12 grid gap-4 px-6 md:grid-cols-3 md:px-16">
      <div class="rounded bg-white p-5 shadow-lg">
        <p class="text-3xl">🎨</p>
        <h2 class="mt-2 font-bold text-slate-900">Finition</h2>
        <p class="text-sm text-slate-600">Enduits, faux plafonds, peinture et carrelage.</p>
      </div>
      <div class="rounded bg-white p-5 shadow-lg">
        <p class="text-3xl">🛠️</p>
        <h2 class="mt-2 font-bold text-slate-900">Rénovation</h2>
        <p class="text-sm text-slate-600">Façades, toitures et parties communes.</p>
      </div>
      <div class="rounded bg-white p-5 shadow-lg">
        <p class="text-3xl">🚧</p>
        <h2 class="mt-2 font-bold text-slate-900">Génie civil</h2>
        <p class="text-sm text-slate-600">Dalots, clôtures et aménagements extérieurs.</p>
      </div>
    </section>

        <section class="mt-12 bg-slate-900 px-6 py-14 text-center text-white md:px-16">
      <h2 class="text-2xl font-bold uppercase">
        Pourquoi choisir <span class="text-amber-500">l'Éternel Bâti</span> ?
      </h2>
      <p class="mt-2 text-slate-300">Un travail soigné, du premier plan à la remise des clés.</p>

      <div class="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
        <div class="rounded border border-slate-600 p-6">
          <p class="text-3xl">👷</p>
          <h3 class="mt-2 font-semibold">Expertise &amp; savoir-faire</h3>
          <p class="mt-1 text-sm text-slate-300">Une équipe qualifiée et expérimentée.</p>
        </div>
        <div class="rounded border border-slate-600 p-6">
          <p class="text-3xl">🛡️</p>
          <h3 class="mt-2 font-semibold">Qualité garantie</h3>
          <p class="mt-1 text-sm text-slate-300">Un travail soigné avec des matériaux de qualité.</p>
        </div>
        <div class="rounded border border-slate-600 p-6">
          <p class="text-3xl">⏱️</p>
          <h3 class="mt-2 font-semibold">Respect des délais</h3>
          <p class="mt-1 text-sm text-slate-300">Des chantiers suivis et livrés à la date prévue.</p>
        </div>
      </div>
    </section>

         <section id="contact" class="bg-[url('/images/galerie-1.jpg')] bg-cover bg-center">
      <div class="bg-slate-900/80 px-6 py-14 text-white md:px-16">
        <div class="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
          <div>
            <h2 class="text-3xl font-bold uppercase">
              Contactez-<span class="text-amber-500">nous</span>
            </h2>
            <p class="mt-3 text-slate-200">Pour discuter de votre projet.</p>
          </div>

          <form
            class="grid gap-3 rounded bg-white p-6 text-slate-900"
            (submit)="$event.preventDefault()"
          >
            <input type="text" placeholder="Nom" class="rounded border border-slate-300 px-3 py-2" />
            <input
              type="email"
              placeholder="Email"
              class="rounded border border-slate-300 px-3 py-2"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              class="rounded border border-slate-300 px-3 py-2"
            />
            <textarea
              rows="4"
              placeholder="Votre message"
              class="rounded border border-slate-300 px-3 py-2"
            ></textarea>
            <button
              type="submit"
              class="justify-self-end rounded bg-amber-500 px-6 py-2 font-semibold text-black"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>

    <div class="flex items-center gap-2 px-6 py-8 md:px-16">
      <label for="numero">Ouvrir le chantier n°</label>
      <input #champ id="numero" type="number" class="rounded border bg-white px-2 py-1" />
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
