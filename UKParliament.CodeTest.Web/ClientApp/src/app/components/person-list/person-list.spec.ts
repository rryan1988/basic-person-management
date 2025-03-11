import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListComponent } from './person-list.component';
import { PersonService } from 'src/app/services/person.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectAllPeople, selectErrors } from 'src/app/store/selectors';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';


describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;
  let store: MockStore;

  const initialState = {
    people: [],
    personErrors: []
  };

  const dummyPeople = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', dateOfBirth: new Date() },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', department: 'Finance', dateOfBirth: new Date() }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonListComponent],
      providers: [
        PersonService,
        provideMockStore({ initialState }),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: 'BASE_URL', useValue: 'http://localhost/' }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    store.setState({ people: dummyPeople, personErrors: [] });

    // Mock selectors
    store.overrideSelector(selectAllPeople, dummyPeople);
    store.overrideSelector(selectErrors, []);
    component.searchTerm$ = new BehaviorSubject<string>("John");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch people', (done) => {
    fixture.detectChanges();
    component.people$.subscribe(people => {
      expect(people.length).toBe(2);
      expect(people).toEqual(dummyPeople);
      done();
    });
  });

  it('should filter people by department', (done) => {
    // Set up the search term
    component.searchTermSubject.next("HR");
    
    fixture.detectChanges();
    component.filteredPeople$.subscribe(filteredPeople => {
      expect(filteredPeople.length).toBe(1);
      expect(filteredPeople[0].department).toBe('HR');
      done();
    });
  });
});