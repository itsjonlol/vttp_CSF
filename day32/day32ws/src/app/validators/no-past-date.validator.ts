// src/app/validators/no-past-date.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noPastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate < today) {
      return { pastDate: true }; 
    }
    return null; 
  };
}