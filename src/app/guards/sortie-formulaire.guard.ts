import { CanDeactivateFn } from '@angular/router';
import { DemandeDevisPage } from '../pages/espace-client/demande-devis';

export const sortieFormulaireGuard: CanDeactivateFn<DemandeDevisPage> = (composant) => {
  if (!composant.aDesModifications()) {
    return true;
  }
  return confirm('Vous avez des saisies non envoyées. Voulez-vous vraiment quitter cette page ?');
};
