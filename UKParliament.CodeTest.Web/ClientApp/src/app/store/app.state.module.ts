import {NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppState, appReducer } from './reducers';

@NgModule({
  imports: [
    StoreModule.forRoot({ appState: appReducer })
  ]
})
export class AppStateModule { }