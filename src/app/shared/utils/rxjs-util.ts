import { NgZone } from '@angular/core';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';

export function inNgZone<T>({ run }: NgZone): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    return new Observable(({ next, error, complete }: Subscriber<T>) => {
      return source.subscribe({
        next: (value: T) => run(() => next(value)),
        error: (err: any) => run(() => error(err)),
        complete: () => run(() => complete())
      });
    });
  };
}
