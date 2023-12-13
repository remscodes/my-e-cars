import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Vehicles } from '@remscodes/renault-api';
import { finalize } from 'rxjs';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Nullable } from '../../../../shared/models/shared.model';
import { BetterRouter } from '../../../../shared/services/better-router.service';
import { VehicleStore } from '../../../renault/services/vehicle-store.service';
import { AuthStore } from '../../services/auth-store.service';
import { Auth } from '../../services/auth.service';

@Component({
  templateUrl: './select-car.component.html',
  styleUrl: './select-car.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    PanelComponent,
    SpinnerComponent,
  ],
})
export class SelectCarComponent implements OnInit {

  private auth = inject(Auth);
  private authStore = inject(AuthStore);
  private vehicleStore = inject(VehicleStore);
  private router = inject(BetterRouter);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public vehicles: WritableSignal<Nullable<Vehicles>> = this.vehicleStore.vehicles;

  public form = this.formBuilder.group({
    vin: ['', Validators.required],
  });

  public isLoading: boolean = false;

  public ngOnInit(): void {
    if (this.isVehiclesSyncWithAccount()) return;

    this.getVehicles();
  }

  private getVehicles(): void {
    this.isLoading = true;
    this.auth.getVehicles().pipe(
      finalize(() => this.isLoading = false),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }


  private isVehiclesSyncWithAccount(): boolean {
    return (this.vehicles()?.accountId === this.authStore.accountId());
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { vin } = this.form.value;

    this.vehicleStore.vin.set(vin!);
  }

  public switchAccount(): void {
    this.router.navigate(['select-account']).then();
  }
}
