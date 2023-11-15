import { RedirectionService } from '@/auth/services/redirection.service';
import { BetterRouter } from '@/shared/services/better-router.service';
import { WINDOW } from '@/shared/tokens/window.token';
import { addHeadScript } from '@/shared/utils/browser-utils';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { emitError } from 'thror';
import { PwaService } from '../core/pwa.service';

function addGoogleMapApiScript(mWindow: Window): () => Promise<boolean> {
  return () => {
    const apiKey: string = mWindow.GOOGLE_MAPS_API_KEY;
    if (!mWindow.GOOGLE_MAPS_API_KEY)
      emitError('GoogleMapsException', 'GOOGLE_MAPS_API_KEY has to be filled into src/environment/env.js');

    return addHeadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`);
  };
}

export const addGoogleMapApiScriptProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: addGoogleMapApiScript,
  deps: [WINDOW],
  multi: true
};

export const initDepsProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: () => () => {},
  deps: [BetterRouter, PwaService, RedirectionService],
  multi: true
};

export const appInitializerProviders: Provider[] = [
  initDepsProvider,
  addGoogleMapApiScriptProvider
];
