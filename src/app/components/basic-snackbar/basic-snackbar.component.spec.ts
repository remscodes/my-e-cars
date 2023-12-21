import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MockMatSnackBarRef } from '../../../tests/mocks/mat-snack-bar-ref.mock';
import { SnackBarData } from '../../models/snack-bar-data.model';
import { BasicSnackbarComponent } from './basic-snackbar.component';

describe('BasicSnackbarComponent', () => {
  let fixture: ComponentFixture<BasicSnackbarComponent>;
  let component: BasicSnackbarComponent;

  const snackbarData: SnackBarData = { message: 'test' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSnackbarComponent],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: snackbarData },
        { provide: MatSnackBarRef, useClass: MockMatSnackBarRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject snack bar data', () => {
    expect(component.data).toEqual(snackbarData);
  });
});
