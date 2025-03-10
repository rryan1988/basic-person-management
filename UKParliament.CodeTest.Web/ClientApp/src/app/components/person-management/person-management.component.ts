import { Component, OnInit } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { Observable } from 'rxjs';
import { selectAllDepartments, selectAllPeople, selectPersonError } from 'src/app/store/selectors';
import { createPerson, loadPeople, updatePerson } from 'src/app/store/actions/people.actions';
import { Store } from '@ngrx/store';
import { DepartmentViewModel } from 'src/app/models/department-view-model';
import { loadDepartments } from 'src/app/store/actions/departments.actions';

@Component({
  selector: 'person-management',
  templateUrl: './person-management.html',
  styleUrls: ['./person-management.scss'],
  standalone: false
})
export class PersonManagementComponent implements OnInit {
  people$: Observable<PersonViewModel[]>;
  departments$: Observable<DepartmentViewModel[]>;
  error$: Observable<any>;
  selectedPerson: PersonViewModel | null = null;
  showCreatePersonComponent = false;

  constructor(private store: Store) {
    this.departments$ = this.store.select(selectAllDepartments);
    this.people$ = this.store.select(selectAllPeople);
    this.error$ = this.store.select(selectPersonError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPeople());
    this.store.dispatch(loadDepartments());
  }

  onPersonSelected(person: PersonViewModel): void {
    this.showCreatePersonComponent = false; // Hide the create person component
    this.selectedPerson = person;
  }

  onSavePerson(person: PersonViewModel): void {
    this.store.dispatch(updatePerson({ person }));
    this.selectedPerson = null;
  }

  onAddPerson(person: PersonViewModel): void {
    this.store.dispatch(createPerson({ person }));
  }

  showCreatePerson(): void {
    this.selectedPerson = null; // Deselect any selected person
    this.showCreatePersonComponent = true; // Show create person component
  }

  closeEditor(): void {
    this.selectedPerson = null; // Close the person editor
  }

  closeCreatePerson(): void {
    this.showCreatePersonComponent = false; // Close the create person component
  }
}