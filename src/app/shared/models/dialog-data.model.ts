export interface DialogData {
  title?: string;
  message?: string;
  yesLabel?: string;
  noLabel?: string;
  type?: DialogType;
}

export type DialogType =
  | 'basic'
  | 'warn';
