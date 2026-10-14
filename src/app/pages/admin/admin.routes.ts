import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AdminChantiers } from './admin-chantiers';
import { AdminDemandes } from './admin-demandes';

const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: '', redirectTo: 'chantiers', pathMatch: 'full' },
      { path: 'chantiers', component: AdminChantiers },
      { path: 'demandes', component: AdminDemandes },
    ],
  },
];

export default routes;
