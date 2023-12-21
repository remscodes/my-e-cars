import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { mockAccountId } from '../../../../../tests/mocks/mock.constants';
import { AuthStore } from '../../services/auth-store.service';
import { SelectCarComponent } from './select-car.component';

describe('SelectCarComponent', () => {
  let fixture: ComponentFixture<SelectCarComponent>;
  let component: SelectCarComponent;
  let authStore: AuthStore;

  const snapshot = new ActivatedRouteSnapshot();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCarComponent],
      providers: [
        provideRenaultClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { snapshot } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCarComponent);
    component = fixture.componentInstance;
    authStore = fixture.debugElement.injector.get(AuthStore);

    authStore.accountId.set(mockAccountId);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
