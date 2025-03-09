import { createReducer, on } from '@ngrx/store';
import { PersonViewModel } from '../models/person-view-model';
import * as PersonActions from './actions/people.actions';
import * as DepartmentActions from './actions/departments.actions';
import { DepartmentViewModel } from '../models/department-view-model';

export interface AppState {
  people: PersonViewModel[];
  departments: DepartmentViewModel[];
  personErrors: [];
  departmentErrors: [];
}

export const initialState: AppState = {
  people: [],
  departments: [],
  personErrors: [],
  departmentErrors: []
};

export const appReducer = createReducer(
  initialState,
  on(PersonActions.loadPeopleSuccess, (state, { people }) => ({ ...state, people })),
  on(PersonActions.loadPeopleFailure, (state, { error }) => ({ ...state, error })),
  on(PersonActions.createPersonSuccess, (state, { person }) => ({ ...state, people: [...state.people, person] })),
  on(PersonActions.createPersonFailure, (state, { error }) => ({ ...state, error })),
  on(PersonActions.updatePersonSuccess, (state, { person }) => ({
    ...state,
    people: state.people.map(p => p.id === person.id ? person : p)
  })),
  on(PersonActions.updatePersonFailure, (state, { error }) => ({ ...state, error })),
  on(DepartmentActions.loadDepartmentsSuccess, (state, { departments }) => ({ ...state, departments })),
  on(DepartmentActions.loadDepartmentsFailure, (state, { error }) => ({ ...state, error }))
);