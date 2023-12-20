import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { VehicleSelectorComponent } from './vehicle-selector.component';

describe('VehicleSelectorComponent', () => {
  let fixture: ComponentFixture<VehicleSelectorComponent>;
  let component: VehicleSelectorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleSelectorComponent],
      providers: [
        provideRenaultClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
