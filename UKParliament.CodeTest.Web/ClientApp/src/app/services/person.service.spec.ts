import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PersonService } from './person.service';
import { PersonViewModel } from '../models/person-view-model';
import { provideHttpClient } from '@angular/common/http';

describe('PersonService', () => {
  let service: PersonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PersonService,
        { provide: 'BASE_URL', useValue: 'https://localhost/' }, // Ensure BASE_URL ends with a slash
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PersonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch people', () => {
    const dummyPeople: PersonViewModel[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', dateOfBirth: new Date() },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', department: 'Finance', dateOfBirth: new Date() }
    ];

    service.getPeople().subscribe(people => {
      expect(people.length).toBe(2);
      expect(people).toEqual(dummyPeople);
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/person`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPeople);
  });

  it('should create a person', () => {
    const newPerson: PersonViewModel = { id: 3, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', department: 'IT', dateOfBirth: new Date() };

    service.createPerson(newPerson).subscribe(person => {
      expect(person).toEqual(newPerson);
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/person`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPerson);
    req.flush(newPerson);
  });

  it('should update a person', () => {
    const updatedPerson: PersonViewModel = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', dateOfBirth: new Date() };

    service.updatePerson(updatedPerson).subscribe(() => {
      // Subscription callback is empty since the method returns void
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/person`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedPerson);
    req.flush(updatedPerson);
  });

  it('should delete a person', () => {
    const personId = 1;

    service.deletePerson(personId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/person/${personId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle error when fetching people', () => {
    const errorMessage = 'Failed to fetch people';

    service.getPeople().subscribe({
      next: () => fail('Expected an error, not person'),
      error: error => {
      expect(error).toBeInstanceOf(Error);
      }
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/person`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Server Error' });
  });

  it('should handle error when creating a person', () => {
    const errorMessage = 'Failed to create person';
    const newPerson: PersonViewModel = { id: 3, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', department: 'IT', dateOfBirth: new Date() };

    service.createPerson(newPerson).subscribe({
      next: () => fail('Expected an error, not person'),
      error: error => {
      expect(error).toBeInstanceOf(Error);
      }
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/person`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Server Error' });
  });

  it('should handle error when updating a person', () => {
    const errorMessage = 'Failed to update person';
    const updatedPerson: PersonViewModel = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', dateOfBirth: new Date() };

    service.updatePerson(updatedPerson).subscribe({
      next: () => fail('Expected an error, not person'),
      error: error => {
      expect(error).toBeInstanceOf(Error);
      }
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/person`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Server Error' });
  });

  it('should handle error when deleting a person', () => {
    const errorMessage = 'Failed to delete person';
    const personId = 1;

    service.deletePerson(personId).subscribe({
      next: () => fail('Expected an error, not person'),
      error: error => {
      expect(error).toBeInstanceOf(Error);
      }
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/person/${personId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Server Error' });
  });

});