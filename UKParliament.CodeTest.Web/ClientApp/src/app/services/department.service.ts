import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentViewModel } from '../models/department-view-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly apiUrl: string;
  public readonly baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.apiUrl = `${this.baseUrl}api/departments`;
  }

  getDepartments(): Observable<DepartmentViewModel[]> {
    return this.http.get<DepartmentViewModel[]>(this.apiUrl);
  }
}