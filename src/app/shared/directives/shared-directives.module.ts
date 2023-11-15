import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RigidImageDirective } from './rigid-image.directive';

@NgModule({
  declarations: [
    RigidImageDirective
  ],
  imports: [
    NgOptimizedImage
  ],
  exports: [
    NgOptimizedImage,
    RigidImageDirective
  ]
})
export class SharedDirectivesModule {}
