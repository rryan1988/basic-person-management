// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "src/app/app.component";
import { CreatePersonComponent } from "src/app/components/create-person/create-person.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { PersonListComponent } from "src/app/components/person-list/person-list.component";
import { PersonManagementComponent } from "src/app/components/person-management/person-management.component";
import { UpdatePersonComponent } from "src/app/components/update-person/update-person.component";
import { PersonService } from "src/app/services/person.service";
import { PersonEffects } from "src/app/store/effects";
import { personReducer } from "src/app/store/reducers";

export const environment = {
  production: false
};
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CreatePersonComponent,
        UpdatePersonComponent,
        PersonListComponent,
        PersonManagementComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        StoreModule.forRoot({ person: personReducer }),
        EffectsModule.forRoot([PersonEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25 })
    ],
    providers: [PersonService, Actions],
    bootstrap: [AppComponent]
})

export class AppModule {
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
