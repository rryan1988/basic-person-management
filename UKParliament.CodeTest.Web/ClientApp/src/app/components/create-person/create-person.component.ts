import { Component, EventEmitter, Output } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { DepartmentViewModel } from '../../models/department-view-model';
import { Observable } from 'rxjs';
import { selectAllDepartments, selectErrors } from 'src/app/store/selectors';
import { Store } from '@ngrx/store';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { personFormGroup } from 'src/app/utils/form-helper';
import { Router } from '@angular/router';
import { createPerson } from 'src/app/store/actions/people.actions';
import { navigateWithAnimation } from 'src/app/utils/animations';
import { clearErrors } from 'src/app/store/actions/actions';


@Component({
  selector: 'create-person',
  templateUrl: './create-person.html',
  styleUrls: ['./create-person.scss'],
  standalone: false,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CreatePersonComponent {
  newPerson: PersonViewModel = { firstName: '', lastName: '', email: '', department: '', dateOfBirth: new Date() };
  departments$: Observable<DepartmentViewModel[]>;
  errorMessage: Observable<string[]>;
  formattedDate: string | null = null;
  showConfirmation: boolean = false;
  personForm: FormGroup;
  @Output() addPerson = new EventEmitter<PersonViewModel>();


  constructor(private store: Store, private router: Router) {
    this.departments$ = this.store.select(selectAllDepartments);
    this.personForm = personFormGroup(this.newPerson);
    this.errorMessage = this.store.select(selectErrors);
  }

  onAdd(): void {
    if (this.personForm.valid) {
      this.setNewPersonFromForm();
      this.store.dispatch(createPerson({ person: this.newPerson }));

      this.errorMessage?.subscribe(errors => {
        if (errors.length < 1) {
          this.showConfirmation = true;
          setTimeout(() => {
            this.showConfirmation = false;
            navigateWithAnimation('/', '#create-person-container', this.router, 300);
          }, 3000); // Hide confirmation message after 3 secondside confirmation message after 3 seconds
        }
      });
    }  
  }

  setNewPersonFromForm(): void {
    this.newPerson = {
      firstName: this.personForm.value.firstName,
      lastName: this.personForm.value.lastName,
      email: this.personForm.value.email,
      department: this.personForm.value.department,
      dateOfBirth: new Date(this.personForm.value.dateOfBirth || '')
    };
  }

  closeEditor(): void {
    setTimeout(() => {
      navigateWithAnimation('/', '#create-person-container', this.router, 300);
    }, 3000)
  }
    clearErrors(): void {
      this.store.dispatch(clearErrors());
    }
}
