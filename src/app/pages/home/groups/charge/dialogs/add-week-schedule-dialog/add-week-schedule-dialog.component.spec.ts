import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MockMatDialogRef } from '../../../../../../../tests/mocks/mat-dialog-ref.mock';
import { AddWeekScheduleDialogComponent, AddWeekScheduleDialogComponentData } from './add-week-schedule-dialog.component';

describe('AddWeekScheduleDialogComponent', () => {
  let fixture: ComponentFixture<AddWeekScheduleDialogComponent>;
  let component: AddWeekScheduleDialogComponent;

  const snapshot = new ActivatedRouteSnapshot();
  const dialogData: AddWeekScheduleDialogComponentData = {
    index: 1,
    schedule: { days: [], activated: false },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWeekScheduleDialogComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot } },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: MatDialogRef, useClass: MockMatDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWeekScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
