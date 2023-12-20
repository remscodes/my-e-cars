import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ChargeActionsComponent } from './charge-actions.component';

describe('ChargeActionsComponent', () => {
  let fixture: ComponentFixture<ChargeActionsComponent>;
  let component: ChargeActionsComponent;

  const snapshot = new ActivatedRouteSnapshot();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeActionsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChargeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
