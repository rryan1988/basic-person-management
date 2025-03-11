import { createAction, props } from '@ngrx/store';
import { PersonViewModel } from '../../models/person-view-model';

export const loadPeople = createAction('[Person] Load People');
export const loadPeopleSuccess = createAction('[Person] Load People Success', props<{ people: PersonViewModel[] }>());
export const loadPeopleFailure = createAction('[Person] Load People Failure', props<{ error: any }>());

export const createPerson = createAction('[Person] Create Person', props<{ person: PersonViewModel }>());
export const createPersonSuccess = createAction('[Person] Create Person Success', props<{ person: PersonViewModel }>());
export const createPersonFailure = createAction('[Person] Create Person Failure', props<{ error: any }>());

export const updatePerson = createAction('[Person] Update Person', props<{ person: PersonViewModel }>());
export const updatePersonSuccess = createAction('[Person] Update Person Success', props<{ person: PersonViewModel }>());
export const updatePersonFailure = createAction('[Person] Update Person Failure', props<{ error: any }>());

export const deletePerson = createAction('[People] Delete Person', props<{ id: number }>());
export const deletePersonSuccess = createAction('[People] Delete Person Success', props<{ id: number }>());
export const deletePersonFailure = createAction('[People] Delete Person Failure', props<{ error: any }>());