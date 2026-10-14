import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { DetailsChantier } from './pages/fiche-chantier/details/details';
import { FicheChantier } from './pages/fiche-chantier/fiche-chantier';
import { GalerieChantier } from './pages/fiche-chantier/galerie/galerie';
import { Introuvable } from './pages/introuvable/introuvable';
import { Realisations } from './pages/realisations/realisations';
import { connexionGuard } from './guards/connexion.guard';
import { roleAdminGuard } from './guards/role-admin.guard';
import { sortieFormulaireGuard } from './guards/sortie-formulaire.guard';
import { chantierResolver } from './resolvers/chantier.resolver';
import { EspaceClient } from './pages/espace-client/espace-client';
import { Suivi } from './pages/espace-client/suivi';
import { DemandeDevisPage } from './pages/espace-client/demande-devis';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'realisations', component: Realisations },
  {
    path: 'realisations/:id',
    component: FicheChantier,
    resolve: { chantier: chantierResolver },
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: DetailsChantier },
      { path: 'galerie', component: GalerieChantier },
    ],
  },
  {
    path: 'espace-client',
    component: EspaceClient,
    canActivate: [connexionGuard],
    canActivateChild: [connexionGuard],
    children: [
      { path: '', redirectTo: 'suivi', pathMatch: 'full' },
      { path: 'suivi', component: Suivi },
      {
        path: 'demande-devis',
        component: DemandeDevisPage,
        canDeactivate: [sortieFormulaireGuard],
      },
    ],
  },
  // Deux routes pour la même adresse : la plus spécifique (protégée) en premier
  {
    path: 'admin',
    canMatch: [roleAdminGuard],
    loadChildren: () => import('./pages/admin/admin.routes'),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/acces-reserve/acces-reserve').then((m) => m.AccesReserve),
  },
  { path: 'introuvable', component: Introuvable },
  { path: '**', component: Introuvable },
];
