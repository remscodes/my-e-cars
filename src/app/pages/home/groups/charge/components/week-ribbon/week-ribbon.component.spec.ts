import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekRibbonComponent } from './week-ribbon.component';

describe('WeekRibbonComponent', () => {
  let fixture: ComponentFixture<WeekRibbonComponent>;
  let component: WeekRibbonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekRibbonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
