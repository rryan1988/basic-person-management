import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { DepartmentService } from '../../services/department.service';
import { PersonViewModel } from '../../models/person-view-model';
import { DepartmentViewModel } from '../../models/department-view-model';

@Component({
  selector: 'create-person',
  templateUrl: './create-person.html',
  styleUrls: ['./create-person.scss'],
  standalone: false
})
export class CreatePersonComponent {
  newPerson: PersonViewModel = { firstName: '', lastName: '', email: '', department: '', dateOfBirth: new Date() };
  departments: DepartmentViewModel[] = [];
  errorMessage: string | null = null;
  @Output() addPerson = new EventEmitter<PersonViewModel>();

  constructor(private departmentService: DepartmentService) {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (result: DepartmentViewModel[]) => this.departments = result,
      error: (e: any) => this.errorMessage = `Error: ${e}`
    });
  }

  onAdd(): void {
    this.addPerson.emit(this.newPerson);
    this.newPerson = { firstName: '', lastName: '', email: '', department: '', dateOfBirth: new Date() }; // Reset form
  }
}