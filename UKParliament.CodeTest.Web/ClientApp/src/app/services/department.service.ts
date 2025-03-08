import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentViewModel } from '../models/department-view-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = `${baseUrl}api/department`;
  }

  getDepartments(): Observable<DepartmentViewModel[]> {
    return this.http.get<DepartmentViewModel[]>(this.apiUrl);
  }

  getDepartmentById(id: number): Observable<DepartmentViewModel> {
    return this.http.get<DepartmentViewModel>(`${this.apiUrl}/${id}`);
  }

  createDepartment(department: DepartmentViewModel): Observable<number> {
    return this.http.post<number>(this.apiUrl, department);
  }

  updateDepartment(department: DepartmentViewModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${department.id}`, department);
  }
}