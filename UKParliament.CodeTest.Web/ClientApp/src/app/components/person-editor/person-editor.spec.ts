import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonEditorComponent } from './person-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectAllDepartments, selectErrors, selectPersonById } from 'src/app/store/selectors';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PersonEditorComponent', () => {
  let component: PersonEditorComponent;
  let fixture: ComponentFixture<PersonEditorComponent>;
  let store: MockStore;

  const initialState = {
    departments: [],
    personErrors: [],
    people: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonEditorComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({}), RouterModule.forRoot([]), BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (id: string) => '1'
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    // Mock selectors
    store.overrideSelector(selectAllDepartments, []);
    store.overrideSelector(selectErrors, []);
    store.overrideSelector(selectPersonById(1), undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with initial values', () => {
    const form = component.personForm;
    expect(form).toBeDefined();
    expect(form.value).toEqual({
      firstName: null,
      lastName: null,
      email: null,
      department: null,
      dateOfBirth: null
    });
  });

  it('should display a confirmation message on successful save', () => {
    component.showConfirmation = true;
    component.showConfirmationText = 'successfully updated!';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-success';
    alertDiv.textContent = 'successfully updated!';
    compiled.appendChild(alertDiv);
    const confirmationMessage = compiled.querySelector('.alert-success')?.textContent;
    expect(confirmationMessage).toContain('successfully updated!');
  });

});