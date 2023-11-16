import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChargeDetails } from '@remscodes/renault-api';
import dayjs from 'dayjs';
import { Optional } from '../../../../../../shared/models/shared.model';
import { BetterRouter } from '../../../../../../shared/services/better-router.service';
import { Loading } from '../../../../../../shared/services/loading.service';
import { ChargeComponent } from '../charge/charge.component';

@Component({
  templateUrl: './charge-history.component.html',
  styleUrls: ['./charge-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ChargeComponent,
  ],
})
export class ChargeHistoryComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    startDate: new FormControl(dayjs().subtract(1, 'week').toDate()),
    endDate: new FormControl('06-23-2023'),
  });

  public charges: Optional<ChargeDetails[]>;

  public constructor(
    private router: BetterRouter,
    private loading: Loading,
    private destroyRef: DestroyRef,
  ) { }

  public ngOnInit(): void {
    this.getCharges();
  }

  private getCharges(): void {
    const { startDate: start, endDate: end } = this.form.value;

    this.loading.start();
    // this.vehicleService.readCharges({ start, end }).pipe(
    //   finalize(() => this.loading.stop()),
    //   takeUntilDestroyed(this.destroyRef),
    // ).subscribe({
    //   next: ({ body: chargesRes }: HttpResponse<Charges>) => {
    //     if (!chargesRes) return;
    //
    //     this.charges = chargesRes.charges;
    //   },
    // });
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }

  public back(): void {
    this.router.back();
  }
}
