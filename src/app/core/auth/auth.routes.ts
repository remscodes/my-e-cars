import { Routes } from '@angular/router';
import { InitSelectAccountComponent } from './components/init-select-account/init-select-account.component';
import { InitSelectCarComponent } from './components/init-select-car/init-select-car.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { selectCarGuard } from './guards/select-car.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    data: {
      hideNavBar: true
    },
    component: LoginComponent
  },
  {
    path: 'init-select-account',
    data: {
      hideNavBar: true
    },
    canActivate: [authGuard()],
    component: InitSelectAccountComponent
  },
  {
    path: 'init-select-car',
    data: {
      hideNavBar: true
    },
    canActivate: [authGuard(), selectCarGuard()],
    component: InitSelectCarComponent
  }
];
