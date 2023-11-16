import { InjectionToken } from '@angular/core';
import { RenaultClient } from '@remscodes/renault-api-client';

export const RENAULT_CLIENT: InjectionToken<RenaultClient> = new InjectionToken('Renault Http Client');
