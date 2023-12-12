import { HttpFeature } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { provideRouter, Routes, withInMemoryScrolling, withRouterConfig } from '@angular/router';

export function provideRootRouter(routes: Routes, ...features: HttpFeature<any>[]): EnvironmentProviders {
  return provideRouter(routes,
    withRouterConfig({
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always',
    }),
    withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
    ...features,
  );
}
