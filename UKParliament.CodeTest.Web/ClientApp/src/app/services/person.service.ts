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
  public readonly baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.apiUrl = `${this.baseUrl}api/person`;
  }

  getPeople(): Observable<PersonViewModel[]> {
    return this.http.get<PersonViewModel[]>(this.apiUrl).pipe(
      catchError(e => this.handleError(e, 'Failed fetch people'))
    );
  }

  getById(id: number): Observable<PersonViewModel> {
    return this.http.get<PersonViewModel>(`${this.apiUrl}/${id}`).pipe(
      catchError(e => this.handleError(e, 'Failed to get person'))
    );
  }

  createPerson(person: PersonViewModel): Observable<PersonViewModel> {
    return this.http.post<PersonViewModel>(this.apiUrl, person).pipe(
      catchError(e => this.handleError(e, 'Failed to create person'))
    );
  }

  updatePerson(person: PersonViewModel): Observable<void> {
    return this.http.put<void>(this.apiUrl, person).pipe(
      catchError(e => this.handleError(e, 'Failed to update'),)
    );
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(e => this.handleError(e, 'Failed to delete'),)
    );
  }

  private handleError(error: any, message:string): Observable<never> {
    console.error('An error occurred:', JSON.parse(error));
    //Logging would occur here.
    return throwError(() => new Error(message || error.message || 'Server error'));
  }
}