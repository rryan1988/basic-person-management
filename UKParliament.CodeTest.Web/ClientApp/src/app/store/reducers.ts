import { createReducer, on } from '@ngrx/store';
import { PersonViewModel } from '../models/person-view-model';
import * as PersonActions from './actions/people.actions';
import * as Actions from './actions/actions'
import * as DepartmentActions from './actions/departments.actions';
import { DepartmentViewModel } from '../models/department-view-model';

export interface AppState {
  people: PersonViewModel[];
  departments: DepartmentViewModel[];
  personErrors: string[];
  departmentErrors: string[];
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
  
  on(PersonActions.loadPeopleFailure, (state, { error }) => (
    { ...state, personErrors: [...state.personErrors, error.message] })),
  
    on(PersonActions.createPersonSuccess, (state, { person }) => (
      {...state, people: [...state.people, person]}
    )),

  on(PersonActions.createPersonFailure, (state, { error }) => (
    {...state, personErrors: [...state.personErrors, error.message] }
  )),
  
    on(PersonActions.updatePersonSuccess, (state, { person }) => {
    return {
      ...state,
      people: state.people.map(p => p.id === person.id ? person : p)
    };
  }),
  
  on(PersonActions.updatePersonFailure, (state, { error }) => {
    return { ...state, personErrors: [...state.personErrors, error.message] };
  }),
  
  on(PersonActions.deletePersonSuccess, (state, { id }) => ({
    ...state,
    people: state.people.filter(p => p.id !== id)
  })),
  on(PersonActions.deletePersonFailure, (state, { error }) => (
    { ...state, personErrors: [...state.personErrors, error.message] }
  )),

  on(DepartmentActions.loadDepartmentsSuccess, (state, { departments }) => ({ ...state, departments })),
  on(DepartmentActions.loadDepartmentsFailure, (state, { error }) => (
    { ...state, departmentErrors: [...state.departmentErrors, error.message] })),

    on(Actions.clearErrors, (state) => ({ ...state, personErrors: [], departmentErrors: [] })),
);