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
export class PersonListComponent implements OnInit {
  people$: Observable<PersonViewModel[]>;
  @Output() personSelected = new EventEmitter<PersonViewModel>();

  constructor(private store: Store) {
    this.people$ = this.store.select(selectAllPeople);
  }

  ngOnInit(): void {
    // No need to load people here, it will be loaded in PersonManagementComponent
  }

  selectPerson(person: PersonViewModel): void {
    this.personSelected.emit(person);
  }
}