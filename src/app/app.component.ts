import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { VehicleSelectorComponent } from './components/vehicle-selector/vehicle-selector.component';
import { slideInAnimation } from './shared/animations/slide.animation';
import { Optional } from './shared/models/shared.model';
import { BetterRouter } from './shared/services/better-router.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BottomNavBarComponent,
    VehicleSelectorComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation],
})
export class AppComponent {

  private router = inject(BetterRouter);
  private outlet = inject(ChildrenOutletContexts);

  public hideNavBar = computed<boolean>(() => this.router.navigationInfo().routeData['hideNavBar']);

  public getRouteAnimationData(): Optional<string> {
    return this.outlet.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
