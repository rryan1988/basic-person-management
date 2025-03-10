import { Component, computed, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { DepartmentViewModel } from '../../models/department-view-model';
import { Observable } from 'rxjs';
import { selectAllDepartments } from 'src/app/store/selectors';
import { Store } from '@ngrx/store';
import { trigger, transition, style, animate } from '@angular/animations';
import { validDate, isPastDate } from '../../utils/date-helper';
import { FormGroup } from '@angular/forms';
import { personFormGroup } from 'src/app/utils/form-helper';
import { formatDate } from '@angular/common';


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
  departments: DepartmentViewModel[] = [];
  errorMessage: string | null = null;
  formattedDate: string | null = null;
  personForm: FormGroup;
  @Output() addPerson = new EventEmitter<PersonViewModel>();
  @Output() closeCreatePersonEvent = new EventEmitter<void>();
   departments$: Observable<DepartmentViewModel[]>;

  constructor(private store: Store) {
    this.departments$ = this.store.select(selectAllDepartments);
    this.personForm = personFormGroup(this.newPerson);
  }

  onAdd(): void {
    if (this.personForm.valid) {
      this.setNewPersonFromForm();
      this.addPerson.emit(this.newPerson);
      this.personForm.reset();
      this.newPerson = { firstName: '', lastName: '', email: '', department: '', dateOfBirth: new Date() }; // Reset form
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


  closeCreatePerson(): void {
    this.closeCreatePersonEvent.emit();
  }
}
