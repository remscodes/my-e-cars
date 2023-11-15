import { AuthInfoService } from '@/auth/services/auth-info.service';
import { AuthService } from '@/auth/services/auth.service';
import { VehicleInfoService } from '@/renault/vehicle-info.service';
import { BetterRouter } from '@/shared/services/better-router.service';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  templateUrl: './init-select-car.component.html',
  styleUrls: ['./init-select-car.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitSelectCarComponent implements OnInit {

  public constructor(
    private vehicleInfoService: VehicleInfoService,
    private authService: AuthService,
    private authInfoService: AuthInfoService,
    private destroyRef: DestroyRef,
    private router: BetterRouter
  ) { }

  /* ------- */

  public vehicles = this.vehicleInfoService.vehicles;

  public vinControl: FormControl = new FormControl('', Validators.required);

  public form: FormGroup = new FormGroup({
    vin: this.vinControl
  });

  public isLoading: boolean = false;

  /* ------- */

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
      takeUntilDestroyed(this.destroyRef)
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
