import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetComponent } from './widget.component';

describe('WidgetComponent', () => {
  let fixture: ComponentFixture<WidgetComponent>;
  let component: WidgetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
