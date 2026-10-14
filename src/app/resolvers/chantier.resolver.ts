import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Chantier } from '../models/chantier.model';
import { ChantierService } from '../services/chantier.service';
import { NotificationService } from '../services/notification.service';

export const chantierResolver: ResolveFn<Chantier | RedirectCommand> = (route) => {
  const service = inject(ChantierService);
  const notification = inject(NotificationService);
  const router = inject(Router);

  const brut = route.paramMap.get('id');
  const numero = Number(brut);

  const echec = () => {
    notification.afficher(`Chantier n° ${brut} introuvable`, 'erreur');
    return of(new RedirectCommand(router.parseUrl('/realisations')));
  };

  // « abc », « 1.5 » ou vide : traité comme un chantier inexistant (règle R2)
  if (brut === null || brut.trim() === '' || !Number.isInteger(numero)) {
    return echec();
  }

  return service.trouver(numero).pipe(catchError(echec));
};
