import { DateType } from '@/shared/models/shared.model';

export interface GigyaError {
  callId?: string;
  errorCode?: number;
  errorDetails?: string;
  errorMessage?: string;
  apiVersion?: number;
  statusCode?: number;
  statusReason?: string;
  time?: DateType;
}

/**
 * Example :
 * {
 *   "callId": "1fb9a6ef2e3b4851b2fa2e699032841c",
 *   "errorCode": 400093,
 *   "errorDetails": "Missing required parameter: ApiKey",
 *   "errorMessage": "Invalid ApiKey parameter",
 *   "apiVersion": 2,
 *   "statusCode": 400,
 *   "statusReason": "Bad Request",
 *   "time": "2023-06-19T15:54:49.261Z"
 * }
 */
