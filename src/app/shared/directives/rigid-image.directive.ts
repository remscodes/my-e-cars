import { Directive } from '@angular/core';

@Directive({
  selector: 'img[rigid]',
  host: {
    'class': 'not-selectable',
    'draggable': 'false'
  }
})
export class RigidImageDirective {}
