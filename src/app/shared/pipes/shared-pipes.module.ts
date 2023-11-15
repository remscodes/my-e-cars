import { NgModule } from '@angular/core';
import { MinuteToHourPipe } from './minute-to-hour.pipe';

@NgModule({
  declarations: [
    MinuteToHourPipe
  ],
  exports: [
    MinuteToHourPipe
  ]
})
export class SharedPipesModule {}
