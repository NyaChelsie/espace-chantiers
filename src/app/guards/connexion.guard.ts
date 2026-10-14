import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const connexionGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const notification = inject(NotificationService);
  const router = inject(Router);

  if (auth.connecte()) {
    return true;
  }

  notification.afficher('Vous devez être connecté pour accéder à cet espace', 'erreur');

  return router.createUrlTree(['/'], {
    queryParams: { connexionRequise: true, redirection: state.url },
  });
};
