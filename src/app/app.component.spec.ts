import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { AppComponent } from './app.component';
import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { VehicleSelectorComponent } from './components/vehicle-selector/vehicle-selector.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const snapshot = new ActivatedRouteSnapshot();
  snapshot.data = { animation: 'HomePage' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterOutlet,
        BottomNavBarComponent,
        VehicleSelectorComponent,
        LoadingComponent,
      ],
      providers: [
        provideRenaultClient(),
        provideNoopAnimations(),
        { provide: ActivatedRoute, useValue: { snapshot } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
