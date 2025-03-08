import { Component, OnInit } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { Observable } from 'rxjs';
import { selectAllPeople, selectPersonError } from 'src/app/store/selectors';
import { createPerson, loadPeople, updatePerson } from 'src/app/store/actions/people.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'person-management',
  templateUrl: './person-management.html',
  styleUrls: ['./person-management.scss'],
   standalone: false
})
export class PersonManagementComponent implements OnInit {
  people$: Observable<PersonViewModel[]>;
  error$: Observable<any>;
  selectedPerson: PersonViewModel | null = null;

  constructor(private store: Store) {
    this.people$ = this.store.select(selectAllPeople);
    this.error$ = this.store.select(selectPersonError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPeople());
  }

  onPersonSelected(person: PersonViewModel): void {
    this.selectedPerson = person;
  }

  onSavePerson(person: PersonViewModel): void {
    this.store.dispatch(updatePerson({ person }));
    this.selectedPerson = null;
  }

  onAddPerson(person: PersonViewModel): void {
    this.store.dispatch(createPerson({ person }));
  }
}