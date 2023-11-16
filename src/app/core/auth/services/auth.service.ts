import { Inject, Injectable } from '@angular/core';
import { AccountInfo, LoginInfo, Person, TokenInfo, Vehicles } from '@remscodes/renault-api';
import { GigyaClient, KamereonClient, RenaultClient } from '@remscodes/renault-api-client';
import { concatMap, from, iif, Observable, of, tap } from 'rxjs';
import { Optional } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';
import { VehicleInfoService } from '../../renault/services/vehicle-info.service';
import { RENAULT_CLIENT } from '../../renault/tokens/renault-client.token';
import { AuthInfoService } from './auth-info.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public constructor(
    @Inject(RENAULT_CLIENT) private renaultClient: RenaultClient,
    private storageService: StorageService,
    private authInfoService: AuthInfoService,
    private vehicleInfoService: VehicleInfoService,
  ) { }

  private gigya: GigyaClient = this.renaultClient.gigya;
  private kamereon: KamereonClient = this.renaultClient.kamereon;

  public login(loginID: string, password: string): Observable<LoginInfo> {
    return from(this.gigya.login(loginID, password)).pipe(
      tap({
        next: (login: LoginInfo) => {
          const loginToken: Optional<string> = login?.sessionInfo?.cookieValue;
          (loginToken) && this.storageService.setGigyaToken(loginToken);
        },
      }),
    );
  }

  public getAccountInfo(): Observable<AccountInfo> {
    return from(this.gigya.getAccountInfo()).pipe(
      tap({
        next: (account: AccountInfo) => {
          const personId: Optional<string> = account?.data?.personId;
          if (personId) this.authInfoService.personId.set(personId);
        },
      }),
    );
  }

  public getJWT(): Observable<TokenInfo> {
    return from(this.gigya.getJwt()).pipe(
      tap({
        next: (info: TokenInfo) => {
          const token: Optional<string> = info?.id_token;
          if (token) this.authInfoService.token.set(token);
        },
      }),
    );
  }

  public getPerson(personId: string): Observable<Person> {
    return from(this.kamereon.getPerson(personId)).pipe(
      tap({
        next: (person: Person) => {
          if (person) this.authInfoService.person.set(person);
        },
      }),
    );
  }

  public getVehicles(accountId: string): Observable<Vehicles> {
    return from(this.kamereon.getAccountVehicles(accountId)).pipe(
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
      concatMap((account: AccountInfo) => this.getPerson(account?.data?.personId!)),
      concatMap(() => iif(
        () => !!this.storageService.getAccountId(),
        this.getVehicles(this.storageService.getAccountId()!),
        of(undefined),
      )),
    );
  }
}
