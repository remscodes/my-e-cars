import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { HOME_PROVIDERS } from './pages/home/home.providers';

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
    loadChildren: () => import('./modules/location/location.module').then(m => m.LocationModule),
  },
  {
    path: 'account',
    canActivate: [authGuard()],
    canMatch: [authGuard()],
    data: {
      animation: 'AccountPage',
    },
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
];
