import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonManagementComponent } from './person-management.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectAllDepartments, selectAllPeople, selectErrors, selectPersonError } from 'src/app/store/selectors';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DepartmentViewModel } from 'src/app/models/department-view-model';

describe('PersonManagementComponent', () => {
  let component: PersonManagementComponent;
  let fixture: ComponentFixture<PersonManagementComponent>;
  let store: MockStore;

  const initialState = {
    people: [],
    personErrors: [],
    departments: []
  };

  const dummyPeople = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', dateOfBirth: new Date() },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', department: 'Finance', dateOfBirth: new Date() }
  ];

  const dummyDepartments: DepartmentViewModel[] = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Sales' },
    { id: 5, name: 'Marketing' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonManagementComponent],
      providers: [
        provideMockStore({ initialState }),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: 'BASE_URL', useValue: 'http://localhost/' }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonManagementComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    store.setState({ people: dummyPeople, personErrors: [], departments: dummyDepartments });

    // Mock selectors
    store.overrideSelector(selectAllPeople, dummyPeople);
    store.overrideSelector(selectAllDepartments, dummyDepartments);
    store.overrideSelector(selectPersonError, []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch people', (done) => {
    component.people$.subscribe(people => {
      expect(people.length).toBe(2);
      expect(people).toEqual(dummyPeople);
      done();
    });
  });

});