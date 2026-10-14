import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1 class="text-3xl font-bold">Administration</h1>

    <nav class="mt-4 flex gap-4 border-b">
      <a
        routerLink="chantiers"
        routerLinkActive="border-b-2 border-slate-800 font-bold"
        class="pb-2"
      >
        Chantiers
      </a>
      <a
        routerLink="demandes"
        routerLinkActive="border-b-2 border-slate-800 font-bold"
        class="pb-2"
      >
        Demandes
      </a>
    </nav>

    <section class="mt-4">
      <router-outlet />
    </section>
  `,
})
export class Admin {}
