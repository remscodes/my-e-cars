import { APP_INITIALIZER, Provider } from '@angular/core';
import { emitError } from 'thror';
import { Optional } from '../shared/models/shared.model';
import { BetterRouter } from '../shared/services/better-router.service';
import { WINDOW } from '../shared/tokens/window.token';
import { addHeadScript } from '../shared/utils/browser-utils';

export const INIT_DEPS_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [BetterRouter],
  useFactory: () => () => {},
};

export const ADD_GOOGLE_MAP_API_SCRIPT_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [WINDOW],
  useFactory: (mWindow: Window) => {
    return () => {
      const apiKey: Optional<string> = mWindow.GOOGLE_MAPS_API_KEY;
      if (!apiKey) emitError('GoogleMapsException', 'GOOGLE_MAPS_API_KEY has to be filled into src/environment/env.js');

      return addHeadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`);
    };
  },
};

export const APP_INITIALIZER_PROVIDERS: Provider[] = [
  INIT_DEPS_PROVIDER,
  ADD_GOOGLE_MAP_API_SCRIPT_PROVIDER,
];
