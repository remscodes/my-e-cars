import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChargeHistoryComponent } from './groups/charge/components/charge-history/charge-history.component';
import { ChargeModeComponent } from './groups/charge/components/charge-mode/charge-mode.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      animation: 'HomePage',
    },
  },
  {
    path: 'charge-mode',
    component: ChargeModeComponent,
    data: {
      animation: 'ChargeModePage',
    },
  },
  {
    path: 'charge-history',
    component: ChargeHistoryComponent,
    data: {
      animation: 'ChargeHistoryPage',
    },
  },
];
