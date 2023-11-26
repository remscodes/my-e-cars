import { Directive } from '@angular/core';

@Directive({
  selector: 'img[rigid]',
  host: {
    'class': 'not-selectable',
    'draggable': 'false',
  },
  standalone: true,
})
export class RigidImageDirective {}
