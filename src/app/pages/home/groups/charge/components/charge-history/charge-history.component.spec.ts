import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { mockAccountId, mockVin } from '../../../../../../../tests/mocks/mock.constants';
import { AuthStore } from '../../../../../../core/auth/services/auth-store.service';
import { VehicleStore } from '../../../../../../core/renault/services/vehicle-store.service';
import { ChargeHistoryComponent } from './charge-history.component';

describe('ChargeHistoryComponent', () => {
  let fixture: ComponentFixture<ChargeHistoryComponent>;
  let component: ChargeHistoryComponent;
  let authStore: AuthStore;
  let vehicleStore: VehicleStore;

  const snapshot = new ActivatedRouteSnapshot();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeHistoryComponent],
      providers: [
        provideRenaultClient(),
        { provide: ActivatedRoute, useValue: { snapshot } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChargeHistoryComponent);
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
