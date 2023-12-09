import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fadeToTop } from '../../shared/animations/fade.animation';

interface MenuItem {
  icon: string;
  label: string;
  link: string;
}

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrl: './bottom-nav-bar.component.css',
  animations: [fadeToTop],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    MatRippleModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class BottomNavBarComponent {

  @Input()
  public display: boolean = true;

  public items: MenuItem[] = [
    { icon: 'home', label: 'Accueil', link: 'home' },
    { icon: 'my_location', label: 'Position', link: 'location' },
    { icon: 'account_circle', label: 'Profil', link: 'account' },
  ];
}
