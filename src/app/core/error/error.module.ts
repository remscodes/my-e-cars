import { NgModule } from '@angular/core';
import { provideCommonRootRouter } from '../../common/router-features';
import { MinModule } from '../../shared/min.module';
import { ErrorComponent } from './components/error/error.component';
import { ERROR_ROUTES } from './error.routes';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    MinModule
  ],
  providers: [
    provideCommonRootRouter(ERROR_ROUTES)
  ]
})
export class ErrorModule {}
