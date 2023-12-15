import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { ACCOUNT_PROVIDERS } from './pages/account/account.providers';
import { HOME_PROVIDERS } from './pages/home/home.providers';
import { LOCATION_PROVIDERS } from './pages/location/location.providers';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    canActivate: [authGuard()],
    canMatch: [authGuard()],
    data: {
      animation: 'HomePage',
    },
    providers: [HOME_PROVIDERS],
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES),
  },
  {
    path: 'location',
    canActivate: [authGuard()],
    canMatch: [authGuard()],
    data: {
      animation: 'LocationPage',
    },
    providers: [LOCATION_PROVIDERS],
    loadChildren: () => import('./pages/location/location.routes').then(m => m.LOCATION_ROUTES),
  },
  {
    path: 'account',
    canActivate: [authGuard()],
    canMatch: [authGuard()],
    data: {
      animation: 'AccountPage',
    },
    providers: [ACCOUNT_PROVIDERS],
    loadChildren: () => import('./pages/account/account.routes').then(m => m.ACCOUNT_ROUTES),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
