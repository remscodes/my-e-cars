import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Vehicles } from '@remscodes/renault-api';
import { finalize } from 'rxjs';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Nullable } from '../../../../shared/models/shared.model';
import { BetterRouter } from '../../../../shared/services/better-router.service';
import { VehicleInfoService } from '../../../renault/services/vehicle-info.service';
import { AuthStoreService } from '../../services/auth-store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './init-select-car.component.html',
  styleUrl: './init-select-car.component.css',
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
export class InitSelectCarComponent implements OnInit {

  private vehicleInfo = inject(VehicleInfoService);
  private auth = inject(AuthService);
  private authStore = inject(AuthStoreService);
  private router = inject(BetterRouter);
  private destroyRef = inject(DestroyRef);

  public vehicles: WritableSignal<Nullable<Vehicles>> = this.vehicleInfo.vehicles;

  public form = new FormGroup({
    vin: new FormControl('', Validators.required),
  });

  public isLoading: boolean = false;

  public ngOnInit(): void {
    if (this.isVehiclesSyncWithAccount()) return;

    this.getVehicles();
  }

  private isVehiclesSyncWithAccount(): boolean {
    return (this.vehicles()?.accountId === this.authStore.accountId());
  }

  private getVehicles(): void {
    // Truthy thanks to selectCarGuard()
    const accountId: string = this.authStore.accountId()!;

    this.isLoading = true;
    this.auth.getVehicles(accountId).pipe(
      finalize(() => this.isLoading = false),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { vin } = this.form.value;

    this.vehicleInfo.vin.set(vin!);
  }

  public switchAccount(): void {
    this.router.navigate(['init-select-account']).then();
  }
}
