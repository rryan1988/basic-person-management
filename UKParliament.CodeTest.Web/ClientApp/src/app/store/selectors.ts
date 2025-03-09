import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './reducers';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectAllPeople = createSelector(
  selectAppState,
  (state: AppState) => state.people
);

export const selectAllDepartments = createSelector(
  selectAppState,
  (state: AppState) => state.departments
);

export const selectPersonError = createSelector(
  selectAppState,
  (state: AppState) => state.personErrors
);

export const selectDepartmentError = createSelector(
  selectAppState,
  (state: AppState) => state.departmentErrors
);