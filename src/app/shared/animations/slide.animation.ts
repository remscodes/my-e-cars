import { animate, animateChild, AnimationMetadata, AnimationTriggerMetadata, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation: AnimationTriggerMetadata = trigger('routeAnimations', [
  transition('HomePage => AccountPage', toDirection('right')),
  transition('HomePage => LocationPage', toDirection('right')),
  transition('HomePage => ChargeModePage', toDirection('right')),
  transition('HomePage => ChargeHistoryPage', toDirection('right')),

  transition('AccountPage => HomePage', toDirection('left')),
  transition('AccountPage => LocationPage', toDirection('left')),

  transition('LocationPage => HomePage', toDirection('left')),
  transition('LocationPage => AccountPage', toDirection('right')),

  transition('ChargeModePage => HomePage', toDirection('left')),

  transition('ChargeHistoryPage => HomePage', toDirection('left'))
]);

function toDirection(side: 'left' | 'right'): AnimationMetadata[] {
  return [
    style({ position: 'relative', overflow: 'hidden' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ]),
    query(':enter', [
      style({ left: (side === 'right') ? '100%' : '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':enter', [
        animate('300ms ease', style({ left: '0%' }))
      ]),
      query(':leave', [
        animate('300ms ease', style({ left: (side === 'right') ? '-100%' : '100%', opacity: 0 }))
      ])
    ])
  ];
}
