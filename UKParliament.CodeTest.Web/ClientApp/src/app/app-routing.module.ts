import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonManagementComponent } from './components/person-management/person-management.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { PersonEditorComponent } from './components/person-editor/person-editor.component';

const routes: Routes = [
  { path: '', 
    component: PersonManagementComponent, children: [
    { 
      path: 'create-person', 
      component: CreatePersonComponent 
    },
    { 
      path: 'edit-person/:id', 
      component: PersonEditorComponent 
    }
  ]},
  { 
    path: '**', 
    redirectTo: '' 
  } // Redirect any unknown paths to the main component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }