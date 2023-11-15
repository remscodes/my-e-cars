import { environment } from '@/environments/environment';
import { WINDOW } from '@/shared/tokens/window.token';
import { Inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate, VersionEvent, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PwaService {

  public constructor(
    @Inject(WINDOW) private window: Window,
    private swUpdate: SwUpdate
  ) {
    this.checkPwaEnabled();
  }

  private checkPwaEnabled(): void {
    (environment.pwa && this.swUpdate.isEnabled) && this.subToIncomingUpdate();
  }

  private subToIncomingUpdate(): void {
    this.swUpdate.versionUpdates.pipe(
      filter((event: VersionEvent): event is VersionReadyEvent => event.type === 'VERSION_READY'),
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        this.window.confirm('Une nouvelle version est disponible. Relancer l\'application ?') && this.window.location.reload();
      }
    });
  }
}
