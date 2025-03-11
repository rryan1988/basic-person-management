import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './reducers';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectAllPeople = createSelector(
  selectAppState,
  (state: AppState) => state.people
);

export const selectPersonById = (id: number) => createSelector(
  selectAppState,
  (state: AppState) => state.people.find(p => p.id === id)
);

export const selectAllDepartments = createSelector(
  selectAppState,
  (state: AppState) => state.departments
);

export const selectErrors = createSelector(
  selectAppState,
  (state: AppState) => state.personErrors.concat(state.departmentErrors)
);

export const selectPersonError = createSelector(
  selectAppState,
  (state: AppState) => state.personErrors
);

export const selectDepartmentError = createSelector(
  selectAppState,
  (state: AppState) => state.departmentErrors
);