import { FormControl, FormGroup, Validators } from '@angular/forms';

type Controls = Record<string, FormControl>

export function basicForm(keys: string[]): FormGroup {
  return new FormGroup(keys.reduce((controls: Controls, key: string) => {
    controls[key] = new FormControl('', Validators.required);
    return controls;
  }, {}));
}
