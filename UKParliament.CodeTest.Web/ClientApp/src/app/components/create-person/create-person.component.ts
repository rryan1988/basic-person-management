import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { DepartmentViewModel } from '../../models/department-view-model';
import { Observable, Subscription } from 'rxjs';
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
   departments$: Observable<DepartmentViewModel[]>;
   private subscription: Subscription;

  constructor(private store: Store) {
    console.log("Selecting Departments v2");
    this.departments$ = this.store.select(selectAllDepartments);
    this.subscription = this.departments$.subscribe(departments => {
      this.departments = departments;
      console.log('Departments:', departments);
    });
  }

  onAdd(): void {
    this.addPerson.emit(this.newPerson);
    this.newPerson = { firstName: '', lastName: '', email: '', department: '', dateOfBirth: new Date() }; // Reset form
  }
}