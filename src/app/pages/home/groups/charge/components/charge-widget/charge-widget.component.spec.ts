import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { mockAccountId } from '../../../../../../../tests/mocks/mock.constants';
import { AuthStore } from '../../../../../../core/auth/services/auth-store.service';
import { ChargeWidgetComponent } from './charge-widget.component';

describe('ChargeWidgetComponent', () => {
  let fixture: ComponentFixture<ChargeWidgetComponent>;
  let component: ChargeWidgetComponent;
  let authStore: AuthStore;

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

    authStore.accountId.set(mockAccountId);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
