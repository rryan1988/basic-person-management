import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
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
      catchError(this.handleError));
  }

  getById(id: number): Observable<PersonViewModel> {
    return this.http.get<PersonViewModel>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError));
  }

  createPerson(person: PersonViewModel): Observable<PersonViewModel> {
    return this.http.post<PersonViewModel>(this.apiUrl, person).pipe(
      catchError(this.handleError)
    );
  }

  updatePerson(person: PersonViewModel): Observable<void> {
    return this.http.put<void>(this.apiUrl, person).pipe(
      catchError(this.handleError)
    );
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', JSON.parse(error));
    return throwError(() => new Error(error.message || 'Server error'));
  }
}