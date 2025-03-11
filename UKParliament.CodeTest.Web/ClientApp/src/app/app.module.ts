import { BrowserModule } from '@angular/platform-browser';
import { APP_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { PersonEditorComponent } from './components/person-editor/person-editor.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonManagementComponent } from './components/person-management/person-management.component';
import { PersonService } from './services/person.service';
import { StoreModule } from '@ngrx/store';
import { PersonEffects } from './store/effects/person.effects';
import { Actions } from '@ngrx/effects';
import { DepartmentService } from './services/department.service';
import { DepartmentEffects } from './store/effects/department.effects';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppStateModule } from './store/app.state.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


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
      ReactiveFormsModule,
      BrowserAnimationsModule,
      FormsModule,
      BsDatepickerModule.forRoot(),
      AppStateModule,
      EffectsModule.forRoot([PersonEffects, DepartmentEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25 }),
      RouterModule.forRoot([
          { path: '', component: PersonManagementComponent, pathMatch: 'full' }
      ]),
      AppRoutingModule
    ],
      
    providers: [
      PersonService, 
      DepartmentService, 
      Actions, 
      provideHttpClient(withInterceptorsFromDi()), 
      { provide: APP_ID, useValue: 'ng-cli-universal' }
    ],
    bootstrap: [AppComponent]
  })

export class AppModule { }