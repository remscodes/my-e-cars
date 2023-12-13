import { Routes } from '@angular/router';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { SelectCarComponent } from './components/select-car/select-car.component';
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
    path: 'select-account',
    data: {
      hideNavBar: true
    },
    canActivate: [authGuard()],
    component: SelectAccountComponent
  },
  {
    path: 'select-car',
    data: {
      hideNavBar: true
    },
    canActivate: [authGuard(), selectCarGuard()],
    component: SelectCarComponent
  }
];
