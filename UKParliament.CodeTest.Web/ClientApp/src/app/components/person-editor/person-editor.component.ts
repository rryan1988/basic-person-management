import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';
import { selectAllDepartments } from 'src/app/store/selectors';
import { Observable } from 'rxjs';
import { DepartmentViewModel } from 'src/app/models/department-view-model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'person-editor',
  templateUrl: './person-editor.html',
  styleUrls: ['./person-editor.scss'],
  standalone: false
})
export class PersonEditorComponent implements OnInit {
  @Input() person: PersonViewModel | null = null;
  @Output() savePerson = new EventEmitter<PersonViewModel>();
  @Output() closeEditorEvent = new EventEmitter<void>();
  departments$: Observable<DepartmentViewModel[]>;
  editedPerson: PersonViewModel | null = null;
  formattedDate: string | null = null;

  constructor(private store: Store) {
    this.departments$ = this.store.select(selectAllDepartments);
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
    }
  }

  onSave(): void {
    if (this.editedPerson) {
      this.editedPerson.dateOfBirth = new Date(this.formattedDate || '');
      this.savePerson.emit(this.editedPerson);
    }
  }

  closeEditor(): void {
    this.closeEditorEvent.emit();
  }
}