import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { VehicleSelectorComponent } from './components/vehicle-selector/vehicle-selector.component';
import { Optional } from './shared/models/shared.model';
import { BetterRouter } from './shared/services/better-router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    BottomNavBarComponent,
    VehicleSelectorComponent,
    LoadingComponent,
  ],
})
export class AppComponent {

  public constructor(
    private router: BetterRouter,
    private contexts: ChildrenOutletContexts,
  ) { }

  public hideNavBar: Signal<boolean> = computed(() => this.router.navigationInfo().routeData['hideNavBar']);

  public getRouteAnimationData(): Optional<string> {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
