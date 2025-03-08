import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,switchMap } from 'rxjs';
import { PersonViewModel } from '../models/person-view-model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = `${baseUrl}api/person`;
  }

  getPeople(): Observable<PersonViewModel[]> {
    return this.http.get<PersonViewModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
      );
  }

  getById(id: number): Observable<PersonViewModel> {
    return this.http.get<PersonViewModel>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getByDepartment(department: string): Observable<PersonViewModel[]> {
    return this.http.get<PersonViewModel[]>(`${this.apiUrl}/department/${department}`).pipe(
      catchError(this.handleError)
    );
  }

  createPerson(person: PersonViewModel): Observable<PersonViewModel> {
    return this.http.post<number>(this.apiUrl, person).pipe(
      switchMap(id => this.getById(id)),
      catchError(this.handleError)
    );
  }

  updatePerson(person: PersonViewModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${person.id}`, person).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error));
  }
}