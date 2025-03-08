import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { PersonEditorComponent } from './components/person-editor/person-editor.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonManagementComponent } from './components/person-management/person-management.component';
import { PersonService } from './services/person.service';
import { departmentReducer, personReducer } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { PersonEffects } from './store/effects/person.effects';
import { Actions } from '@ngrx/effects';
import { DepartmentService } from './services/department.service';
import { DepartmentEffects } from './store/effects/department.effects';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CreatePersonComponent,
        PersonEditorComponent,
        PersonListComponent,
        PersonManagementComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      StoreModule.forRoot({ person: personReducer, department: departmentReducer }),
      EffectsModule.forRoot([PersonEffects, DepartmentEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25 })
    ],
    providers: [PersonService, DepartmentService, Actions],
    bootstrap: [AppComponent]
  })

export class AppModule { }