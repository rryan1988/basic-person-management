import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonViewModel } from '../../models/person-view-model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
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
  @Input() selectedPerson: PersonViewModel | null = null;
  @Output() personSelected = new EventEmitter<PersonViewModel>();
  @Output() showCreatePerson = new EventEmitter<void>();

  searchTerm: string = '';
  public searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();
  filteredPeople$: Observable<PersonViewModel[]>;

  constructor(private store: Store) {
    this.people$ = this.store.select(selectAllPeople);
      this.filteredPeople$ = combineLatest([this.people$, this.searchTerm$]).pipe(
        map(([people, searchTerm]) => {
          if (!searchTerm) {
            return people;
          }
          return people.filter(person =>
            person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.department.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }

  selectPerson(person: PersonViewModel): void {
    this.selectedPerson = person;
    this.personSelected.emit(person);
  }

  createPerson(): void {
    this.selectedPerson = null;
    this.showCreatePerson.emit();
  }

  onKeydown(event: KeyboardEvent, person: PersonViewModel): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectPerson(person);
    }
  }

  filterPeople(): void {
    this.searchTermSubject.next(this.searchTerm);
  }
}