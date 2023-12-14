import { inject, Injectable, NgZone } from '@angular/core';
import { Nullable } from '../models/shared.model';
import { LOCAL_STORAGE } from '../tokens/local-storage.token';
import { SESSION_STORAGE } from '../tokens/session-storage.token';
import { capitalize } from '../utils/string-utils';

const LOCAL_STORAGE_KEYS = [
  'gigyaToken',
] as const;

const SESSION_STORAGE_KEYS = [
  'token',
  'previousUrl',
  'accountId',
  'vin',
] as const;

@Injectable({ providedIn: 'root' })
export class StorageService {

  private sessionStorage = inject(SESSION_STORAGE);
  private localStorage = inject(LOCAL_STORAGE);
  private ngZone = inject(NgZone);

  private formatKey(key: string): string {
    return `my-e-cars:${key}`;
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

  private setSessionItem(key: string, value: string): void {
    this.setInStorage(this.sessionStorage, key, value);
  }

  private getSessionItem(key: string): string | null {
    return this.getFromStorage(this.sessionStorage, key);
  }

  private clearSessionItem(key: string): void {
    this.removeFromStorage(this.sessionStorage, key);
  }

  private setLocalItem(key: string, value: string): void {
    this.setInStorage(this.localStorage, key, value);
  }

  private getLocalItem(key: string): string | null {
    return this.getFromStorage(this.localStorage, key);
  }

  private clearLocalItem(key: string): void {
    this.removeFromStorage(this.localStorage, key);
  }

  public clearAllFromSession(): void {
    SESSION_STORAGE_KEYS.forEach(key => this[`clear${capitalize(key)}`]());
  }
}

export interface StorageService
  extends StorageMethods<typeof LOCAL_STORAGE_KEYS[number]>,
    StorageMethods<typeof SESSION_STORAGE_KEYS[number]> {}

type StorageMethods<T> =
  & Setters<T>
  & Getters<T>
  & Clears<T>

type Setters<T> = {
  [K in T as `set${Capitalize<K & string>}`]: (value: string) => void;
}

type Getters<T> = {
  [K in T as `get${Capitalize<K & string>}`]: () => Nullable<string>;
}

type Clears<T> = {
  [K in T as `clear${Capitalize<K & string>}`]: () => void;
}

LOCAL_STORAGE_KEYS.forEach(key => {
  StorageService.prototype[`set${capitalize(key)}`] = function (value: string) {
    this['setLocalItem'](key, value);
  };
  StorageService.prototype[`get${capitalize(key)}`] = function () {
    return this['getLocalItem'](key);
  };
  StorageService.prototype[`clear${capitalize(key)}`] = function () {
    this['clearLocalItem'](key);
  };
});

SESSION_STORAGE_KEYS.forEach(key => {
  StorageService.prototype[`set${capitalize(key)}`] = function (value: string) {
    this['setSessionItem'](key, value);
  };
  StorageService.prototype[`get${capitalize(key)}`] = function () {
    return this['getSessionItem'](key);
  };
  StorageService.prototype[`clear${capitalize(key)}`] = function () {
    this['clearSessionItem'](key);
  };
});
