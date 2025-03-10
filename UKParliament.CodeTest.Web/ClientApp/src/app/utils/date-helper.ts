import { formatDate } from "@angular/common";
import { booleanAttribute } from "@angular/core";
import { FormControl, ValidationErrors } from "@angular/forms";

export function validDate (date: Date): boolean {
  return !isNaN(new Date(date).getTime());
}

export function isPastDate (date: Date): boolean {
  return new Date(date).getTime() < Date.now();
}

export class DateOfBirthValidator {
    static validDate(control: FormControl): ValidationErrors | null {
        const date = control.value;
        return validDate(date) ? null : { invalidDate: true };
    }
    
    static futureDate(control: FormControl): ValidationErrors | null {
        const date = control.value;
        return isPastDate(date) ? null : { futureDate: true };
    }
}