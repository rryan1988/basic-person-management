import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { selectAllDepartments } from 'src/app/store/selectors';
import { Observable } from 'rxjs';
import { DepartmentViewModel } from 'src/app/models/department-view-model';
import { Store } from '@ngrx/store';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { personFormGroup } from 'src/app/utils/form-helper';

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

export class PersonEditorComponent implements OnInit {
  @Input() person: PersonViewModel | null = null;
  @Output() savePerson = new EventEmitter<PersonViewModel>();
  @Output() closeEditorEvent = new EventEmitter<void>();
  departments$: Observable<DepartmentViewModel[]>;
  editedPerson: PersonViewModel | null = null;
  formattedDate: string | null = null;
  errorMessage: string | null = null;
  personForm: FormGroup

  constructor(private store: Store) {
    this.departments$ = this.store.select(selectAllDepartments);
    this.personForm = personFormGroup();
  }

  ngOnInit(): void {
    if (this.person) {
      // Clone the person object
      this.updatePerson();
      
    }
  }
  formatDate(date: Date | string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.person) {
      this.updatePerson();
    }
  }

  updatePerson(): void {
    if (this.person) {
      // Clone the person object
      this.editedPerson = { ...this.person };
      this.formattedDate = this.formatDate(this.editedPerson.dateOfBirth);
      this.personForm.patchValue(this.editedPerson);
      this.personForm.get('dateOfBirth')?.patchValue(this.formattedDate);
    }
  }

  onSave(): void {
    if (this.editedPerson) {
      this.formattedDate = this.formatDate(this.personForm.value.dateOfBirth);
      this.editedPerson.dateOfBirth = new Date(this.formattedDate || '');
      console.log("saving", this.editedPerson)
      this.savePerson.emit(this.editedPerson);
    }
  }

  closeEditor(): void {
    this.closeEditorEvent.emit();
  }
}