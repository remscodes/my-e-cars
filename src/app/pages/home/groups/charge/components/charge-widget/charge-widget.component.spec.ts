import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { mockAccountId, mockVin } from '../../../../../../../tests/mocks/mock.constants';
import { AuthStore } from '../../../../../../core/auth/services/auth-store.service';
import { VehicleStore } from '../../../../../../core/renault/services/vehicle-store.service';
import { ChargeWidgetComponent } from './charge-widget.component';

describe('ChargeWidgetComponent', () => {
  let fixture: ComponentFixture<ChargeWidgetComponent>;
  let component: ChargeWidgetComponent;
  let authStore: AuthStore;
  let vehicleStore: VehicleStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeWidgetComponent],
      providers: [
        provideRenaultClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChargeWidgetComponent);
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
