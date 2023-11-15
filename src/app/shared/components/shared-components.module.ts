import { NgModule } from '@angular/core';
import { MinModule } from '../min.module';
import { PanelComponent } from './panel/panel.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    PanelComponent
  ],
  imports: [
    MinModule
  ],
  exports: [
    SpinnerComponent,
    PanelComponent
  ]
})
export class SharedComponentsModule {}
