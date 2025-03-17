import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ageValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      if (control.value === '') return null;
  
      const dob = new Date(control.value); // the selected date
      console.log(dob)
      const age = calculateAge(dob);
      console.log(age);
      if (age >= min) {
        return null;
      } else {
        return { minAge: { min } };
      }
    };
  }
  
  function calculateAge(dob: Date): number {
      if (!dob) return 0;
  
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
  
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    }