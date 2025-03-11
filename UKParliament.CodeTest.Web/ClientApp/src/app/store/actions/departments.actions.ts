import { createAction, props } from '@ngrx/store';
import { DepartmentViewModel } from '../../models/department-view-model';

export const loadDepartments = createAction('[Department] Load Departments');
export const loadDepartmentsSuccess = createAction('[Department] Load Departments Success', props<{ departments: DepartmentViewModel[] }>());
export const loadDepartmentsFailure = createAction('[Department] Load Departments Failure', props<{ error: any }>());