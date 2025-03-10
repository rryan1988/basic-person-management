import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonViewModel } from '../../models/person-view-model';
import { Observable } from 'rxjs';
import { selectAllPeople } from 'src/app/store/selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'person-list',
  templateUrl: './person-list.html',
  styleUrls: ['./person-list.scss'],
  standalone: false
})
export class PersonListComponent {
  people$: Observable<PersonViewModel[]>;
  @Output() personSelected = new EventEmitter<PersonViewModel>();
  @Output() showCreatePerson = new EventEmitter<void>();

  constructor(private store: Store) {
    this.people$ = this.store.select(selectAllPeople);
  }

  selectPerson(person: PersonViewModel): void {
    this.personSelected.emit(person);
  }

  createPerson(): void {
    this.showCreatePerson.emit();
  }
}