import { Provider } from '@angular/core';
import { RenaultClient } from '@remscodes/renault-api-client';
import { Nullable } from '../../shared/models/shared.model';
import { StorageService } from '../../shared/services/storage.service';
import { RENAULT_CLIENT } from './tokens/renault-client.token';

export const RENAULT_PROVIDERS: Provider[] = [
  {
    provide: RENAULT_CLIENT,
    deps: [StorageService],
    useFactory: (storage: StorageService) => () => {
      const client = new RenaultClient();

      const token: Nullable<string> = storage.getToken();
      if (token) client.session.token = token;

      return client;
    },
  },
];
