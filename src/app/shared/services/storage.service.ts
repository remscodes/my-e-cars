import { Inject, Injectable, NgZone } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens/local-storage.token';
import { SESSION_STORAGE } from '../tokens/session-storage.token';

@Injectable({ providedIn: 'root' })
export class StorageService {

  public constructor(
    @Inject(SESSION_STORAGE) private sessionStorage: Storage,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private ngZone: NgZone
  ) { }

  /* ------- */

  private readonly keyPrefix: string = 'my-reno:';

  private readonly previousUrlKey: string = 'previous_url';
  private readonly tokenKey: string = 'token';
  private readonly accountIdKey: string = 'account_id';
  private readonly vinKey: string = 'vin';

  private readonly gigyaTokenKey: string = 'gigya_token';
  private readonly appKeyKey: string = 'app_key';

  /* ------- */

  private formatKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  private convertValue(value: string): any {
    console.log(value);
    switch (true) {
      case value === 'undefined':
        return undefined;
      case value !== ''
      && (
        (value.startsWith('[') && value.endsWith(']'))
        || (value.startsWith('{') && value.endsWith('}'))
        || value === 'null'
        || value === 'true'
        || value === 'false'
      ):
        return JSON.parse(value);
      default:
        return value;
    }
  }

  private setInStorage(storage: Storage, key: string, value: any): void {
    this.ngZone.run(() => storage.setItem(this.formatKey(key), `${value}`));
  }

  private getFromStorage(storage: Storage, key: string): any {
    return this.ngZone.run(() => storage.getItem(this.formatKey(key))!);
  }

  private removeFromStorage(storage: Storage, key: string): void {
    this.ngZone.run(() => storage.removeItem(this.formatKey(key)));
  }

  /* ------- */

  private setSessionItem(key: string, value: string): void {
    this.setInStorage(this.sessionStorage, key, value);
  }

  private getSessionItem(key: string): string | null {
    return this.getFromStorage(this.sessionStorage, key);
  }

  private clearSessionItem(key: string): void {
    this.removeFromStorage(this.sessionStorage, key);
  }

  /* ------- */

  private setLocalItem(key: string, value: string): void {
    this.setInStorage(this.localStorage, key, value);
  }

  private getLocalItem(key: string): string | null {
    return this.getFromStorage(this.localStorage, key);
  }

  private clearLocalItem(key: string): void {
    this.removeFromStorage(this.localStorage, key);
  }

  /* ------- */

  public setPreviousUrl(url: string): void {
    this.setSessionItem(this.previousUrlKey, url);
  }

  public getPreviousUrl(): string | null {
    return this.getSessionItem(this.previousUrlKey);
  }

  public clearPreviousUrl(): void {
    this.clearSessionItem(this.previousUrlKey);
  }

  /* ------- */

  public setGigyaToken(token: string): void {
    this.setLocalItem(this.gigyaTokenKey, token);
  }

  public getGigyaToken(): string | null {
    return this.getLocalItem(this.gigyaTokenKey);
  }

  public clearGigyaToken(): void {
    this.clearLocalItem(this.gigyaTokenKey);
  }

  /* ------- */

  public setToken(token: string): void {
    this.setSessionItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return this.getSessionItem(this.tokenKey);
  }

  public clearToken(): void {
    this.clearSessionItem(this.tokenKey);
  }

  /* ------- */

  public setAppKey(appKey: string): void {
    this.setLocalItem(this.appKeyKey, appKey);
  }

  public getAppKey(): string | null {
    return this.getLocalItem(this.appKeyKey);
  }

  public clearAppKey(): void {
    this.clearLocalItem(this.appKeyKey);
  }

  /* ------- */

  public setAccountId(accountId: string): void {
    this.setSessionItem(this.accountIdKey, accountId);
  }

  public getAccountId(): string | null {
    return this.getSessionItem(this.accountIdKey);
  }

  public clearAccountId(): void {
    this.clearSessionItem(this.accountIdKey);
  }

  /* ------- */

  public setVin(vin: string): void {
    this.setSessionItem(this.vinKey, vin);
  }

  public getVin(): string | null {
    return this.getSessionItem(this.vinKey);
  }

  public clearVin(): void {
    this.clearSessionItem(this.vinKey);
  }

  /* ------- */

  public clearAllFromSession(): void {
    this.clearPreviousUrl();
    this.clearToken();
    this.clearAccountId();
  }

  public clearAllFromLocal(): void {
    this.clearGigyaToken();
    this.clearAppKey();
  }

  public clearAll(): void {
    this.clearAllFromSession();
    this.clearAllFromLocal();
  }
}

