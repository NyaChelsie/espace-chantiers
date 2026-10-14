import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SeulementPourDirective } from './directives/seulement-pour.directive';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SeulementPourDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  notification = inject(NotificationService);
  auth = inject(AuthService);
  private readonly router = inject(Router);

  // Vrai tant que le routeur a une navigation en cours (resolver qui attend)
  readonly enChargement = computed(() => this.router.currentNavigation() !== null);

  deconnecter(): void {
    this.auth.deconnecter();
    const url = this.router.url;
    if (url.startsWith('/espace-client') || url.startsWith('/admin')) {
      this.router.navigate(['/']);
    }
  }
}
