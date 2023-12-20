import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LockWidgetComponent } from './lock-widget.component';

describe('LockWidgetComponent', () => {
  let fixture: ComponentFixture<LockWidgetComponent>;
  let component: LockWidgetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LockWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
