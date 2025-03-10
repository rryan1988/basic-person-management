import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() selectedPerson: PersonViewModel | null = null;
  //selectedPerson: PersonViewModel | null = null;

  constructor(private store: Store) {
    this.people$ = this.store.select(selectAllPeople);
  }

  selectPerson(person: PersonViewModel): void {
    this.selectedPerson = person;
    this.personSelected.emit(person);
  }

  createPerson(): void {
    this.selectedPerson = null;
    this.showCreatePerson.emit();
  }
}