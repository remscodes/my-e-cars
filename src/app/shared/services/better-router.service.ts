import { inject, Injectable, NgZone, signal, WritableSignal } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, Event, NavigationBehaviorOptions, NavigationCancel, NavigationEnd, NavigationError, NavigationExtras, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterState } from "@angular/router";
import { Observable } from "rxjs";
import { WINDOW } from '../tokens/window.token';
import { Loading } from "./loading.service";
import { StorageService } from './storage.service';

interface NavigationInfo {
  routeData: Data;
}

@Injectable({ providedIn: 'root' })
export class BetterRouter {

  public constructor() {
    this.subToRouterEvents();
  }

  private window = inject(WINDOW);
  private router = inject(Router);
  private loading = inject(Loading);
  private ngZone = inject(NgZone);
  private storage = inject(StorageService);
  private route = inject(ActivatedRoute);

  public navigationInfo: WritableSignal<NavigationInfo> = signal({
    routeData: {},
  });

  private subToRouterEvents(): void {
    this.events.pipe(
      takeUntilDestroyed(),
    ).subscribe({
      next: (event: Event) => {
        switch (true) {
          case event instanceof ResolveStart:
          case event instanceof RouteConfigLoadStart:
            this.loading.start();
            break;

          case event instanceof ResolveEnd:
          case event instanceof RouteConfigLoadEnd:
            this.loading.stop();
            break;

          case event instanceof NavigationCancel:
          case event instanceof NavigationError:
            this.loading.stopForce();
            break;

          case event instanceof NavigationEnd:
            this.updateNavigationInfo();
            break;
        }
      },
    });
  }

  private updateNavigationInfo(): void {
    this.navigationInfo.set({
      routeData: this.getData(),
    });
  }

  private getData(): Data {
    let child = this.route.root.firstChild;
    while (child) {
      if (child.firstChild) child = child.firstChild;
      else return child.snapshot.data;
    }
    return {};
  }

  public get events(): Observable<Event> {
    return this.router.events;
  }

  public get url(): string {
    return this.router.url;
  }

  public get routerState(): RouterState {
    return this.router.routerState;
  }

  public initialNavigation(): void {
    this.ngZone.run(() => this.router.initialNavigation());
  }

  public navigate(commands: string[], extras?: NavigationExtras): Promise<boolean> {
    return this.ngZone.run(() => this.router.navigate(commands, extras));
  }

  public navigateByUrl(url: string, extras?: NavigationBehaviorOptions): Promise<boolean> {
    return this.ngZone.run(() => this.router.navigateByUrl(url, extras));
  }

  public async navigateToPreviousUrlIfExist(fallbackUrl?: string): Promise<boolean> {
    const url: string | null = this.storage.getPreviousUrl();
    if (!url) {
      (fallbackUrl) && await this.navigateByUrl(fallbackUrl);
      return false;
    }

    await this.navigateByUrl(url);

    this.storage.clearPreviousUrl();

    return true;
  }

  public back(delta: number = - 1): void {
    this.window.history.go(delta);
  }
}
