import { HttpFeature } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding, withInMemoryScrolling, withRouterConfig } from '@angular/router';

export function provideCommonRootRouter(routes: Routes, ...features: HttpFeature<any>[]): EnvironmentProviders {
  return provideRouter(routes,
    withComponentInputBinding(),
    withRouterConfig({
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    }),
    withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),
    ...features
  );
}

export function provideCommonChildRouter(routes: Routes, ...features: HttpFeature<any>[]): EnvironmentProviders {
  return provideRouter(routes,
    withComponentInputBinding(),
    ...features
  );
}
