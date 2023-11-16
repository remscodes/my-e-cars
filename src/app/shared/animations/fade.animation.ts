import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const fadeToTop: AnimationTriggerMetadata = trigger('fadeToTop', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate('300ms ease', style({ opacity: 0, transform: 'translateY(20px)' })),
  ]),
]);

export const fade: AnimationTriggerMetadata = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease', style({ opacity: '*' })),
  ]),
]);
