import { EnvironmentProviders } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding, withInMemoryScrolling, withRouterConfig } from '@angular/router';

export function provideCommonRootRouter(routes: Routes): EnvironmentProviders {
  return provideRouter(routes,
    withComponentInputBinding(),
    withRouterConfig({
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    }),
    withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  );
}

export function provideCommonChildRouter(routes: Routes): EnvironmentProviders {
  return provideRouter(routes,
    withComponentInputBinding()
  );
}
