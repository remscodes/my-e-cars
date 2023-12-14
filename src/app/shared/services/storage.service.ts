import { Injectable } from '@angular/core';
import { StorageFactory } from './storage-factory.service';

@Injectable({ providedIn: 'root' })
export class StorageService extends StorageFactory {}

export const LOCAL_STORAGE_KEYS = [
  'gigyaToken',
] as const;

export const SESSION_STORAGE_KEYS = [
  'token',
  'previousUrl',
  'accountId',
  'vin',
] as const;
