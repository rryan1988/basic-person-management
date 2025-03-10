import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { DepartmentViewModel } from '../../models/department-view-model';
import { Observable } from 'rxjs';
import { selectAllDepartments } from 'src/app/store/selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'create-person',
  templateUrl: './create-person.html',
  styleUrls: ['./create-person.scss'],
  standalone: false
})
export class CreatePersonComponent {
  newPerson: PersonViewModel = { firstName: '', lastName: '', email: '', department: '', dateOfBirth: new Date() };
  departments: DepartmentViewModel[] = [];
  errorMessage: string | null = null;
  @Output() addPerson = new EventEmitter<PersonViewModel>();
  @Output() closeCreatePersonEvent = new EventEmitter<void>();
   departments$: Observable<DepartmentViewModel[]>;

  constructor(private store: Store) {
    this.departments$ = this.store.select(selectAllDepartments);
  }

  onAdd(): void {
    console.log("saving new person", this.newPerson);
    this.addPerson.emit(this.newPerson);
    this.newPerson = { firstName: '', lastName: '', email: '', department: '', dateOfBirth: new Date() }; // Reset form
  }

  closeCreatePerson(): void {
    this.closeCreatePersonEvent.emit();
  }
}