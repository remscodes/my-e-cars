export interface SnackBarData {
  message: string;
  type?: SnackBarType;
}

export type SnackBarType =
  | 'basic'
  | 'warn'
