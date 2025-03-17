// src/app/validators/no-past-date.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noPastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate < today) {
      return { pastDate: true };  // validation fails. it is a past date
    }
    return null;  // passes, meaning no error
  };
}

export function noFutureDateValidator():ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate > today) {
      return { futureDate: true }; //validation fails. it is a future date
    }
    return null; 
  };
}

export function customAgeValidator():ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minAge = 18;

    const selectedDate = new Date(control.value);
    const birthYear = selectedDate.getFullYear();

    const currentYear:number = new Date().getFullYear();

    if ((currentYear - birthYear) <= 18) {
      return { invalidAge: true }; 
    }
    
    return null; 
  };
}