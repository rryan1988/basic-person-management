import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DepartmentService } from '../../services/department.service';
import * as DepartmentActions from '../actions/departments.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DepartmentEffects {

      loadDepartments$ = createEffect(() =>
        this.actions$.pipe(
          ofType(DepartmentActions.loadDepartments),
          mergeMap(() =>
            this.departmentService.getDepartments().pipe(
              map(departments => DepartmentActions.loadDepartmentsSuccess({ departments })),
              catchError(error => of(DepartmentActions.loadDepartmentsFailure({ error })))
            )
          )
        )
      );

  constructor( 
    private actions$: Actions,
    private departmentService: DepartmentService
  ) { }
}