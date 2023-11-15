import { provideCommonRootRouter } from '@/common/router-features';
import { SharedModule } from '@/shared/shared.module';
import { NgModule } from '@angular/core';
import { AUTH_ROUTES } from './auth.routes';
import { InitSelectAccountComponent } from './components/init-select-account/init-select-account.component';
import { InitSelectCarComponent } from './components/init-select-car/init-select-car.component';
import { LoginComponent } from './components/login/login.component';
import { authInitializerProviders } from './providers/auth-initializer';

@NgModule({
  declarations: [
    LoginComponent,
    InitSelectCarComponent,
    InitSelectAccountComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    authInitializerProviders,
    provideCommonRootRouter(AUTH_ROUTES)
  ]
})
export class AuthModule {}
