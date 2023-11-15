import { APP_INITIALIZER, Provider } from '@angular/core';
import { emitError } from 'thror';
import { RedirectionService } from '../core/auth/services/redirection.service';
import { Optional } from '../shared/models/shared.model';
import { BetterRouter } from '../shared/services/better-router.service';
import { WINDOW } from '../shared/tokens/window.token';
import { addHeadScript } from '../shared/utils/browser-utils';

function addGoogleMapApiScript(mWindow: Window): () => Promise<boolean> {
  return () => {
    const apiKey: Optional<string> = mWindow.GOOGLE_MAPS_API_KEY;
    if (!apiKey)
      emitError('GoogleMapsException', 'GOOGLE_MAPS_API_KEY has to be filled into src/environment/env.js');

    return addHeadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`);
  };
}

export const addGoogleMapApiScriptProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: addGoogleMapApiScript,
  deps: [WINDOW],
  multi: true,
};

export const initDepsProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: () => () => {},
  deps: [BetterRouter, RedirectionService],
  multi: true,
};

export const appInitializerProviders: Provider[] = [
  initDepsProvider,
  addGoogleMapApiScriptProvider,
];
