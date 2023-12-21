import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockMatDialogRef } from '../../../../../../../tests/mocks/mat-dialog-ref.mock';
import { AddScheduleDialogComponentData, AddTimeScheduleDialogComponent } from './add-time-schedule-dialog.component';

describe('AddTimeScheduleDialogComponent', () => {
  let fixture: ComponentFixture<AddTimeScheduleDialogComponent>;
  let component: AddTimeScheduleDialogComponent;

  const dialogData: AddScheduleDialogComponentData = { time: new Date() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTimeScheduleDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: MatDialogRef, useClass: MockMatDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTimeScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
