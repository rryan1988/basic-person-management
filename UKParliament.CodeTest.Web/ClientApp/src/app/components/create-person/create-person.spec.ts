import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePersonComponent } from './create-person.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectAllDepartments, selectErrors } from 'src/app/store/selectors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreatePersonComponent', () => {
  let component: CreatePersonComponent;
  let fixture: ComponentFixture<CreatePersonComponent>;
  let store: MockStore;

  const initialState = {
    departments: [],
    personErrors: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePersonComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({}), BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState })
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePersonComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    // Mock selectors
    store.overrideSelector(selectAllDepartments, []);
    store.overrideSelector(selectErrors, []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with initial values', () => {
    const form = component.personForm;
    expect(form).toBeDefined();
    expect(form.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      dateOfBirth: jasmine.any(Date)
    });
  });

  it('should display a confirmation message on successful save', () => {
    component.showConfirmation = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.alert-success')?.textContent).toContain('Person successfully created!');
  });

});