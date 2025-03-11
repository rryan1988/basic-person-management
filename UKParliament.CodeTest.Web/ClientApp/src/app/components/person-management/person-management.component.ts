import { Component, OnInit } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { Router } from '@angular/router';
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
  //showCreatePersonComponent = false;

  constructor(private store: Store, private router: Router) {
    this.departments$ = this.store.select(selectAllDepartments);
    this.people$ = this.store.select(selectAllPeople);
    this.error$ = this.store.select(selectPersonError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPeople());
    this.store.dispatch(loadDepartments());
  }

  onPersonSelected(person: PersonViewModel): void {
    this.router.navigate(['edit-person', person.id], { relativeTo: this.router.routerState.root });
    this.selectedPerson = person;
  }

  onSavePerson(person: PersonViewModel): void {
    this.store.dispatch(updatePerson({ person }));
    this.router.navigate(['/']);
  }

  onAddPerson(person: PersonViewModel): void {
    if (this.isValidPerson(person)) {
      this.store.dispatch(createPerson({ person }));
      this.router.navigate(['/']);
    }
  }

  showCreatePerson(): void {
    this.router.navigate(['create-person'], { relativeTo: this.router.routerState.root });
  }

  closeEditor(): void {
    this.router.navigate(['/']);
  }

  closeCreatePerson(): void {
    this.router.navigate(['/']);
  }

  isValidPerson(person: PersonViewModel): boolean {
    return person.firstName.length > 0 && person.lastName.length > 0 && person.email.length > 0 && person.department.length >0;
  }
}