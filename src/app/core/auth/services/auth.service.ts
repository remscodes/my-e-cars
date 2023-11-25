import { Injectable } from '@angular/core';
import { NgxGigyaClient, NgxKamereonClient, NgxRenaultClient } from '@remscodes/ngx-renault-api-client';
import { AccountInfo, LoginInfo, Person, TokenInfo, Vehicles } from '@remscodes/renault-api';
import { concatMap, iif, Observable, of, tap } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';
import { VehicleInfoService } from '../../renault/services/vehicle-info.service';
import { AuthInfoService } from './auth-info.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public constructor(
    private renault: NgxRenaultClient,
    private storageService: StorageService,
    private authInfoService: AuthInfoService,
    private vehicleInfoService: VehicleInfoService,
  ) { }

  private gigya: NgxGigyaClient = this.renault.gigya;
  private kamereon: NgxKamereonClient = this.renault.kamereon;

  public login(loginID: string, password: string): Observable<LoginInfo> {
    return this.gigya.login(loginID, password).pipe(
      tap({
        next: ({ sessionInfo: { cookieValue } = {} }: LoginInfo) => {
          if (cookieValue) this.storageService.setGigyaToken(cookieValue);
        },
      }),
    );
  }

  public getAccountInfo(): Observable<AccountInfo> {
    return this.gigya.getAccountInfo().pipe(
      tap({
        next: ({ data: { personId } = {} }: AccountInfo) => {
          if (personId) this.authInfoService.personId.set(personId);
        },
      }),
    );
  }

  public getJWT(): Observable<TokenInfo> {
    return this.gigya.getJwt().pipe(
      tap({
        next: ({ id_token }: TokenInfo) => {
          if (id_token) this.storageService.setToken(id_token);
        },
      }),
    );
  }

  public getPerson(personId: string): Observable<Person> {
    return this.kamereon.getPerson(personId).pipe(
      tap({
        next: (person: Person) => {
          if (person) this.authInfoService.person.set(person);
        },
      }),
    );
  }

  public getVehicles(accountId: string): Observable<Vehicles> {
    return this.kamereon.getAccountVehicles(accountId).pipe(
      tap({
        next: (vehicles: Vehicles) => {
          if (vehicles) this.vehicleInfoService.vehicles.set(vehicles);
        },
      }),
    );
  }

  public getAuthInfos(): Observable<any> {
    return this.getJWT().pipe(
      concatMap(() => this.getAccountInfo()),
      concatMap(({ data: { personId } = {} }: AccountInfo) => this.getPerson(personId!)),
      concatMap(() => iif(
        () => !!this.storageService.getAccountId(),
        this.getVehicles(this.storageService.getAccountId()!),
        of(undefined),
      )),
    );
  }
}
