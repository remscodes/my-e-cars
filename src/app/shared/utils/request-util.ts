import { HttpParams, HttpRequest } from "@angular/common/http";
import { Coalable } from '../models/shared.model';

export function createParams(obj?: any): HttpParams {
  return Object.entries(obj)
    .reduce((params: HttpParams, [key, value]: [string, any]) => {
      if (typeof value === 'string') return params.set(key, value);
      else if (Array.isArray(value)) return value.reduce((innerParams) => innerParams, params);
      return params;
    }, new HttpParams());
}

export function addHeaderOnCondition(request: HttpRequest<unknown>, condition: boolean, key: string, value: Coalable<string | string[]>): HttpRequest<unknown> {
  return addOnCondition(request, 'setHeaders', condition, key, value);
}

export function addParamOnCondition(request: HttpRequest<unknown>, condition: boolean, key: string, value: Coalable<string>): HttpRequest<unknown> {
  return addOnCondition(request, 'setParams', condition, key, value);
}

function addOnCondition(request: HttpRequest<unknown>, updateKey: 'setHeaders' | 'setParams', condition: boolean, key: string, value: Coalable<string | string[]>): HttpRequest<unknown> {
  return (condition && value)
    ? request.clone({ [updateKey]: { [key]: value } })
    : request;
}
