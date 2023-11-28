import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { fadeToTop } from '../../shared/animations/fade.animation';
import { BetterRouter } from '../../shared/services/better-router.service';

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
    NgIf,
    NgForOf,
    MatIconModule,
    MatRippleModule,
  ],
})
export class BottomNavBarComponent {

  private router: BetterRouter = inject(BetterRouter);

  @Input()
  public display: boolean = true;

  public items: MenuItem[] = [
    { icon: 'home', label: 'Accueil', link: 'home' },
    { icon: 'my_location', label: 'Position', link: 'location' },
    { icon: 'account_circle', label: 'Profil', link: 'account' },
  ];

  public navigate(link: string): void {
    this.router.navigate([link]).then();
  }

  public trackByLink = (_i: number, { link }: MenuItem) => link;
}
