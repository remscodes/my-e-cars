import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { SelectAccountComponent } from './select-account.component';

describe('SelectAccountComponent', () => {
  let fixture: ComponentFixture<SelectAccountComponent>;
  let component: SelectAccountComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAccountComponent],
      providers: [
        provideRenaultClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
