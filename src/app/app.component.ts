import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { Optional } from './shared/models/shared.model';
import { BetterRouter } from './shared/services/better-router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public constructor(
    private router: BetterRouter,
    private contexts: ChildrenOutletContexts
  ) { }

  public hideNavBar: Signal<boolean> = computed(() => this.router.navigationInfo().routeData['hideNavBar']);

  public getRouteAnimationData(): Optional<string> {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
