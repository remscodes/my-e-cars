import { fadeToTop } from '@/shared/animations/fade.animation';
import { IconRegistry } from '@/shared/modules/rems-element/icon/utils/icon-util';
import { BetterRouter } from '@/shared/services/better-router.service';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface MenuItem {
  icon: IconRegistry;
  label: string;
  link: string;
}

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss'],
  animations: [fadeToTop],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavBarComponent {

  @Input()
  public displayNavBar: boolean = true;

  public items: MenuItem[] = [
    {
      icon: 'home',
      label: 'Accueil',
      link: 'home'
    },
    {
      icon: 'my-location',
      label: 'Position',
      link: 'location'
    },
    {
      icon: 'account-circle',
      label: 'Profil',
      link: 'account'
    }
  ];

  public constructor(
    private router: BetterRouter
  ) { }

  public navigate(link: string): void {
    this.router.navigate([link]).then();
  }
}
