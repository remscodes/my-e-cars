import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { HvacWidgetComponent } from './hvac-widget.component';

describe('HvacWidgetComponent', () => {
  let fixture: ComponentFixture<HvacWidgetComponent>;
  let component: HvacWidgetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HvacWidgetComponent],
      providers: [
        provideRenaultClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HvacWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
