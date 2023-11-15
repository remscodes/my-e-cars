import { inject, InjectionToken } from "@angular/core";
import { WINDOW } from './window.token';

export const LOCAL_STORAGE: InjectionToken<Storage> = new InjectionToken('Window Local Storage', {
  providedIn: 'root',
  factory: () => inject(WINDOW).localStorage
});
