import { Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

export const ERROR_ROUTES: Routes = [
  {
    path: '404',
    title: 'Page non trouvée',
    data: {
      statusCode: 404,
      message: 'La page que vous recherchez n\'existe pas.'
    },
    component: ErrorComponent
  },
  {
    path: '403',
    title: 'Accès refusé',
    data: {
      statusCode: 403,
      message: 'Vous n\'avez pas les permissions nécessaires pour consulter cette page.'
    },
    component: ErrorComponent
  },
  {
    path: '503',
    title: 'Service indisponible',
    data: {
      statusCode: 503,
      message: 'Le service est indisponible. Merci de contacter votre administrateur.'
    },
    component: ErrorComponent
  },
  {
    path: '401',
    title: 'Privilèges insuffisants',
    data: {
      statusCode: 401,
      message: 'Vous n\'avez pas les privilèges nécessaires pour cette application. Merci de contacter votre responsable.'
    },
    component: ErrorComponent
  }
];
