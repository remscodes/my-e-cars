import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, iif, Observable, of, tap } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';
import { VehicleInfoService } from '../../renault/vehicle-info.service';
import { AuthInfoService } from './auth-info.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public constructor(
    private gigyaService: GigyaService,
    private kamereonService: KamereonService,
    private storageService: StorageService,
    private authInfoService: AuthInfoService,
    private vehicleInfoService: VehicleInfoService,
  ) { }

  /* ------- */

  public login(loginID: string, password: string): Observable<HttpResponse<LoginInfo>> {
    return this.gigyaService.login(loginID, password).pipe(
      tap({
        next: ({ body }: HttpResponse<LoginInfo>) => {
          const loginToken: Optional<string> = body?.sessionInfo?.cookieValue;
          (loginToken) && this.storageService.setGigyaToken(loginToken);
        },
      }),
    );
  }

  public getAccountInfo(): Observable<HttpResponse<AccountInfo>> {
    // return this.gigyaService.getAccountInfo().pipe(
    //   tap({
    //     next: ({ body }: HttpResponse<AccountInfo>) => {
    //       const personId: Optional<string> = body?.data?.personId;
    //       if (personId) this.authInfoService.personId.set(personId);
    //     }
    //   })
    // );
    return mockedResponse(mockAccountInfo).pipe(
      tap({
        next: ({ body }: HttpResponse<AccountInfo>) => {
          const personId: Optional<string> = body?.data?.personId;
          if (personId) this.authInfoService.personId.set(personId);
        },
      }),
    );
  }

  public getJWT(): Observable<HttpResponse<Token>> {
    // return this.gigyaService.getJWT().pipe(
    //   tap({
    //     next: ({ body }: HttpResponse<Token>) => {
    //       const token: Optional<string> = body?.id_token;
    //       if (token) this.authInfoService.token.set(token);
    //     }
    //   })
    // );
    return mockedResponse(mockJwt).pipe(
      tap({
        next: ({ body }: HttpResponse<Token>) => {
          const token: Optional<string> = body?.id_token;
          if (token) this.authInfoService.token.set(token);
        },
      }),
    );
  }

  public getPerson(personId: string): Observable<HttpResponse<Person>> {
    // return this.kamereonService.getPerson(personId).pipe(
    //   tap({
    //     next: ({ body: person }: HttpResponse<Person>) => {
    //       if (person) this.authInfoService.person.set(person);
    //     }
    //   })
    // );
    return mockedResponse(mockPerson).pipe(
      tap({
        next: ({ body: person }: HttpResponse<Person>) => {
          if (person) this.authInfoService.person.set(person);
        },
      }),
    );
  }

  public getVehicles(accountId: string): Observable<HttpResponse<Vehicles>> {
    // return this.kamereonService.getAccountVehicles(accountId).pipe(
    //   tap({
    //     next: ({ body: vehicles }: HttpResponse<Vehicles>) => {
    //       if (vehicles) {
    //         this.vehicleInfoService.vehicles.set(vehicles);
    //       }
    //     }
    //   })
    // );
    return mockedResponse(mockAccountVehicles).pipe(
      tap({
        next: ({ body: vehicles }: HttpResponse<Vehicles>) => {
          if (vehicles) {
            this.vehicleInfoService.vehicles.set(vehicles);
          }
        },
      }),
    );
  }

  public getAuthInfos(): Observable<any> {
    return this.getJWT().pipe(
      concatMap(() => this.getAccountInfo()),
      concatMap(({ body }: HttpResponse<AccountInfo>) => this.getPerson(body?.data?.personId!)),
      concatMap(() => iif(
        () => !!this.storageService.getAccountId(),
        this.getVehicles(this.storageService.getAccountId()!),
        of(undefined),
      )),
    );
  }
}
