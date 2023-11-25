import { Injectable, signal, WritableSignal } from "@angular/core";

export interface AnnounceStatus {
  active: boolean;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class Announcer {

  public status: WritableSignal<AnnounceStatus> = signal({ active: false });

  public notify(message: string, duration?: number): void {
    this.createSnackBar(message, duration);
  }

  public warn(message: string, duration?: number): void {
    this.createSnackBar(message, duration, 'warn');
  }

  public get isErrorAnnounceActive(): boolean {
    return (this.status().active)
      && (this.status().type === 'warn');
  }

  private createSnackBar(message: string, duration: number | undefined, type: string = 'basic'): void {
    console.log(message);
    // const snackBarRef: MatSnackBarRef<BasicSnackbarComponent> = this.snackBar.openFromComponent(BasicSnackbarComponent, {
    //   horizontalPosition: 'center',
    //   verticalPosition: 'bottom',
    //   duration,
    //   data: { message, type }
    // });
    // this.subToSnackBarStates(snackBarRef);
  }

  // private subToSnackBarStates(snackBarRef: MatSnackBarRef<BasicSnackbarComponent>): void {
  //   this.afterOpenedSub = snackBarRef.afterOpened().pipe(
  //     finalize(() => this.emitAnnounceStatus({
  //       active: true,
  //       type: snackBarRef.instance.data.type ?? 'basic'
  //     }))
  //   ).subscribe();
  //
  //   this.afterDismissedSub = snackBarRef.afterDismissed().pipe(
  //     finalize(() => this.emitAnnounceStatus({
  //       active: false
  //     }))
  //   ).subscribe();
  // }
}
