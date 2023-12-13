import { inject, Injectable } from '@angular/core';
import { NgxGigyaClient, NgxKamereonClient } from '@remscodes/ngx-renault-api-client';
import { AccountInfo, LoginInfo, Person, TokenInfo, Vehicles } from '@remscodes/renault-api';
import { concatMap, Observable, tap } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';
import { VehicleStore } from '../../renault/services/vehicle-store.service';
import { AuthStore } from './auth-store.service';

@Injectable({ providedIn: 'root' })
export class Auth {

  private gigya = inject(NgxGigyaClient);
  private kamereon = inject(NgxKamereonClient);
  private storage = inject(StorageService);
  private authStore = inject(AuthStore);
  private vehicleStore = inject(VehicleStore);

  public login(loginID: string, password: string): Observable<LoginInfo> {
    return this.gigya.login(loginID, password).pipe(
      tap({
        next: ({ sessionInfo: { cookieValue } = {} }: LoginInfo) => {
          if (cookieValue) this.storage.setGigyaToken(cookieValue);
        },
      }),
    );
  }

  public getAccountInfo(): Observable<AccountInfo> {
    return this.gigya.getAccountInfo().pipe(
      tap({
        next: ({ data: { personId } = {} }: AccountInfo) => {
          if (personId) this.authStore.personId.set(personId);
        },
      }),
    );
  }

  public getJWT(exp: number = 9000): Observable<TokenInfo> {
    return this.gigya.getJwt(exp).pipe(
      tap({
        next: ({ id_token }: TokenInfo) => {
          if (id_token) this.storage.setToken(id_token);
        },
      }),
    );
  }

  public getPerson(personId?: string): Observable<Person> {
    return this.kamereon.getPerson(personId).pipe(
      tap({
        next: (person: Person) => {
          if (person) this.authStore.person.set(person);
        },
      }),
    );
  }

  public getVehicles(accountId?: string): Observable<Vehicles> {
    return this.kamereon.getAccountVehicles(accountId).pipe(
      tap({
        next: (vehicles: Vehicles) => {
          if (vehicles) this.vehicleStore.vehicles.set(vehicles);
        },
      }),
    );
  }

  public getAuthInfos(): Observable<any> {
    return this.getAccountInfo().pipe(
      concatMap(() => this.getPerson()),
    );
  }
}
