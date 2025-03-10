import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateOfBirthValidator } from "./date-helper";
import { PersonViewModel } from "../models/person-view-model";

export function personFormGroup(person?: PersonViewModel) : FormGroup {
    return new FormGroup({ 
        firstName: new FormControl(person?.firstName, [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-Z'-]+$/),
        ]),
        lastName: new FormControl(person?.lastName, [
            Validators.required,
            Validators.pattern(/^[a-zA-Z'-]+$/),
            Validators.maxLength(50),
            Validators.minLength(3)
        ]),
        dateOfBirth: new FormControl(person?.dateOfBirth, [
            Validators.required,
            DateOfBirthValidator.validDate,
            DateOfBirthValidator.futureDate
        ]),
        email: new FormControl(person?.email, [
            Validators.required,
            Validators.email
        ]),
        department: new FormControl(person?.department, [
            Validators.required
        ])
    });
}