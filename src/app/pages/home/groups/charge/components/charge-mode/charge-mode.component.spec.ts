import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { mockAccountId, mockVin } from '../../../../../../../tests/mocks/mock.constants';
import { AuthStore } from '../../../../../../core/auth/services/auth-store.service';
import { VehicleStore } from '../../../../../../core/renault/services/vehicle-store.service';
import { ChargeModeComponent } from './charge-mode.component';

describe('ChargeModeComponent', () => {
  let fixture: ComponentFixture<ChargeModeComponent>;
  let component: ChargeModeComponent;
  let authStore: AuthStore;
  let vehicleStore: VehicleStore;

  const snapshot = new ActivatedRouteSnapshot();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeModeComponent],
      providers: [
        provideRenaultClient(),
        provideNoopAnimations(),
        { provide: ActivatedRoute, useValue: { snapshot } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChargeModeComponent);
    component = fixture.componentInstance;
    authStore = fixture.debugElement.injector.get(AuthStore);
    vehicleStore = fixture.debugElement.injector.get(VehicleStore);

    authStore.accountId.set(mockAccountId);
    vehicleStore.vin.set(mockVin);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
