import { APP_INITIALIZER, Provider } from '@angular/core';
import { NgxRenaultSession } from '@remscodes/ngx-renault-api-client';
import { Nullable } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';

export const INIT_RENAULT_SESSION: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [NgxRenaultSession, StorageService],
  useFactory: (session: NgxRenaultSession, storage: StorageService) => {
    return () => {
      checkAndSet(session, storage.getGigyaToken(), 'gigyaToken');
      checkAndSet(session, storage.getToken(), 'token');
      checkAndSet(session, storage.getAccountId(), 'accountId');
    };
  },
};

function checkAndSet(session: NgxRenaultSession, value: Nullable<string>, key: keyof NgxRenaultSession): void {
  if (value) session[key] = value;
}
