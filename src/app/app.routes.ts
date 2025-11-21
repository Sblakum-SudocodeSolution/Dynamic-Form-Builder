import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup').then((m) => m.Signup),
  },
  {
    path: 'terms-condition',
    loadComponent: () =>
      import('./pages/terms-condition/terms-condition').then(
        (m) => m.TermsCondition
      ),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
  },
  {
    path: '',
    component: Layout,
  },
];
