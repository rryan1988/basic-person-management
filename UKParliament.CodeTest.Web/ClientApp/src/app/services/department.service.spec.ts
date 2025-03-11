import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DepartmentService } from './department.service';
import { DepartmentViewModel } from '../models/department-view-model';
import { provideHttpClient } from '@angular/common/http';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepartmentService,
        { provide: 'BASE_URL', useValue: 'https://localhost/' },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(DepartmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch departments', () => {
    const dummyDepartments: DepartmentViewModel[] = [
      { id: 1, name: 'HR' },
      { id: 2, name: 'Finance' }
    ];

    service.getDepartments().subscribe(departments => {
      expect(departments.length).toBe(2);
      expect(departments).toEqual(dummyDepartments);
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/departments`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDepartments);
  });

  it('should handle error when fetching departments', () => {
    const errorMessage = 'Failed to fetch departments';

    service.getDepartments().subscribe({
      next: () => fail('Expected an error, not departments'),
      error: (error) => expect(error.message).toContain(errorMessage)
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/departments`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Failed to fetch departments' });
  });

});