import { Routes } from '@angular/router';
import { ChargeHistoryComponent } from './groups/charge/components/charge-history/charge-history.component';
import { ChargeModeComponent } from './groups/charge/components/charge-mode/charge-mode.component';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    data: {
      animation: 'HomePage',
    },
    component: HomeComponent,
  },
  {
    path: 'charge-mode',
    data: {
      animation: 'ChargeModePage',
    },
    component: ChargeModeComponent,

  },
  {
    path: 'charge-history',
    data: {
      animation: 'ChargeHistoryPage',
    },
    component: ChargeHistoryComponent,
  },
];
