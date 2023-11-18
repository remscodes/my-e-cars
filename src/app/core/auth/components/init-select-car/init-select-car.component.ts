import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { BetterRouter } from '../../../../shared/services/better-router.service';
import { VehicleInfoService } from '../../../renault/services/vehicle-info.service';
import { AuthInfoService } from '../../services/auth-info.service';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './init-select-car.component.html',
  styleUrls: ['./init-select-car.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    PanelComponent,
    SpinnerComponent,
  ],
})
export class InitSelectCarComponent implements OnInit {

  public constructor(
    private vehicleInfoService: VehicleInfoService,
    private authService: AuthService,
    private authInfoService: AuthInfoService,
    private destroyRef: DestroyRef,
    private router: BetterRouter,
  ) { }

  public vehicles = this.vehicleInfoService.vehicles;

  public form: FormGroup = new FormGroup({
    vin: new FormControl('', Validators.required),
  });

  public isLoading: boolean = false;

  public ngOnInit(): void {
    if (this.isVehiclesSyncWithAccount()) return;

    this.getVehicles();
  }

  private isVehiclesSyncWithAccount(): boolean {
    return (this.vehicles()?.accountId === this.authInfoService.selectedAccountId());
  }

  private getVehicles(): void {
    // Truthy because of selectCarGuard()
    const accountId: string = this.authInfoService.selectedAccountId()!;

    this.isLoading = true;
    this.authService.getVehicles(accountId).pipe(
      finalize(() => this.isLoading = false),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { vin } = this.form.value;

    this.vehicleInfoService.selectedVin.set(vin);
  }

  public switchAccount(): void {
    this.router.navigate(['init-select-account']).then();
  }
}