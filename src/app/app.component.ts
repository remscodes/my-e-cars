import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';
import { Optional } from './shared/models/shared.model';
import { BetterRouter } from './shared/services/better-router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    BottomNavBarComponent,
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
