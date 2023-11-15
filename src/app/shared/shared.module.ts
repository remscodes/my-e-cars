import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { MinModule } from './min.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';

@NgModule({
  exports: [
    MinModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule
  ]
})
export class SharedModule {}
