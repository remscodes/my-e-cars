import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChargeComponent } from './charge.component';

describe('ChargeComponent', () => {
  let fixture: ComponentFixture<ChargeComponent>;
  let component: ChargeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChargeComponent);
    component = fixture.componentInstance;

    component.charge = {};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
