import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, input, computed } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { selectAllDepartments, selectErrors, selectPersonById } from 'src/app/store/selectors';
import { Observable, switchMap } from 'rxjs';
import { DepartmentViewModel } from 'src/app/models/department-view-model';
import { Store } from '@ngrx/store';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { personFormGroup } from 'src/app/utils/form-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { deletePerson, updatePerson } from 'src/app/store/actions/people.actions';
import { navigateWithAnimation } from 'src/app/utils/animations';
import { clearErrors } from 'src/app/store/actions/actions';

@Component({
  selector: 'person-editor',
  templateUrl: './person-editor.html',
  styleUrls: ['./person-editor.scss'],
  standalone: false,
  animations: [
      trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms ease-in', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('300ms ease-out', style({ opacity: 0 }))
        ])
      ])
    ]
  })

export class PersonEditorComponent {

  @Output() savePerson = new EventEmitter<PersonViewModel>();
  @Output() closeEditorEvent = new EventEmitter<void>();
  person: PersonViewModel | undefined;
  departments$: Observable<DepartmentViewModel[]>;
  editedPerson: PersonViewModel | null = null;
  formattedDate: string | null = null;
  errorMessage: Observable<string[]> | null = null;
  showConfirmation: boolean = false;
  showConfirmationText: string = '';
  personForm: FormGroup
  showDeleteConfirmation: boolean = false;
  deleteConfirmation: string = '';
  deleteConfirmationText = 'I Understand';
  enableDelete = computed(() => this.deleteConfirmation == this.deleteConfirmationText)

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {

    this.departments$ = this.store.select(selectAllDepartments);
    this.errorMessage = this.store.select(selectErrors);
    this.personForm = personFormGroup();
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = +params.get('id')!;
        return this.store.select(selectPersonById(id));
      })
    ).subscribe(person => {
      this.person = person;
      this.updatePerson();
    });
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  //ngOnChanges(changes: SimpleChanges): void {
    //if (changes.person) {
      //this.updatePerson();
    //}
  //}

  updatePerson(): void {
    if (this.person) {
      this.editedPerson = { ...this.person };
      this.formattedDate = this.formatDate(this.editedPerson.dateOfBirth);
      this.editedPerson.dateOfBirth = this.formattedDate;
      this.personForm.patchValue(this.editedPerson);
      //this.personForm.get('dateOfBirth')?.patchValue(this.formattedDate);
    }
  }

  clearErrors(): void {
    this.store.dispatch(clearErrors());
  }


  updatePersonFromForm() : void {
    this.editedPerson = {
      id: this.person!.id,
      firstName: this.personForm.value.firstName,
      lastName: this.personForm.value.lastName,
      email: this.personForm.value.email,
      department: this.personForm.value.department,
      dateOfBirth: this.formatDate(this.personForm.value.dateOfBirth)
    };
  }

  onShowDeleteConfirmation(){
    this.showDeleteConfirmation = true;
  }

  onSave(): void {
    if (this.editedPerson) {
      this.updatePersonFromForm();
      this.store.dispatch(updatePerson({ person: this.editedPerson }));
      this.errorMessage?.subscribe(errors => {
        if (errors.length < 1) {
          this.showConfirmationText = this.editedPerson?.firstName + ' was successfully updated!';
          this.showConfirmation = true;
          setTimeout(() => {
            this.showConfirmation = false;
            this.showConfirmationText = '';
          }, 3000) // Hide confirmation message after 3 seconds
        }
      });

    }
  }

  onDelete(): void {
    if (this.editedPerson) {
      this.showDeleteConfirmation = false;
      this.store.dispatch(deletePerson({ id: this.editedPerson.id! }));
      this.showConfirmationText = "Person Deleted successfully";
      this.showConfirmation = true;
      this.closeEditor();
    }
  }

  closeEditor(): void {
    setTimeout(() => {
      navigateWithAnimation('/', '#person-editor', this.router, 300);
    }, 3000) // Hide confirmation message after 3 seconds
  }
}