import { Observable, of } from 'rxjs';

export class MockMatSnackBarRef<T = any> {

  public afterOpened(): Observable<void> {
    return of(undefined);
  }

  public afterDismissed(): Observable<void> {
    return of(undefined);
  }

  public dismiss(): void { }
}
