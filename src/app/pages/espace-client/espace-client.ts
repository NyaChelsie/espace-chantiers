import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-espace-client',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1 class="text-3xl font-bold">Espace client</h1>

    <nav class="mt-4 flex gap-4 border-b">
      <a
        routerLink="suivi"
        routerLinkActive="border-b-2 border-slate-800 font-bold"
        class="pb-2"
      >
        Suivi
      </a>
      <a
        routerLink="demande-devis"
        routerLinkActive="border-b-2 border-slate-800 font-bold"
        class="pb-2"
      >
        Demande de devis
      </a>
    </nav>

    <section class="mt-4">
      <router-outlet />
    </section>
  `,
})
export class EspaceClient {}
