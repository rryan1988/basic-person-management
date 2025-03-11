import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersonService } from '../../services/person.service';
import * as PersonActions from '../actions/people.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PersonEffects {
    
  loadPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.loadPeople),
      mergeMap(() =>
        this.personService.getPeople().pipe(
          map(people => PersonActions.loadPeopleSuccess({ people })),
          catchError(error => of(PersonActions.loadPeopleFailure({ error })))
        )
      )
    )
  );

  createPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.createPerson),
      mergeMap(action =>
        this.personService.createPerson(action.person).pipe(
          map(person => PersonActions.createPersonSuccess({ person })),
          catchError(error => of(PersonActions.createPersonFailure({ error })))
        )
      )
    )
  );

  updatePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.updatePerson),
      mergeMap(action =>
        this.personService.updatePerson(action.person).pipe(
          map(() => PersonActions.updatePersonSuccess({ person: action.person })),
          catchError(error => of(PersonActions.updatePersonFailure({ error })))
        )
      )
    )
  );

  deletePerson$ = createEffect(() => this.actions$.pipe(
    ofType(PersonActions.deletePerson),
    mergeMap(action => this.personService.deletePerson(action.id)
      .pipe(
        map(() => PersonActions.deletePersonSuccess({ id: action.id })),
        catchError(error => of(PersonActions.deletePersonFailure({ error })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private personService: PersonService
  ) { }
}