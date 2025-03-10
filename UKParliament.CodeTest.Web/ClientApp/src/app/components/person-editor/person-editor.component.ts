import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  departments$: Observable<DepartmentViewModel[]>;
  editedPerson: PersonViewModel | null = null;

  constructor(private store: Store) {
    this.departments$ = this.store.select(selectAllDepartments);
  }

  ngOnInit(): void {
    if (this.person) {
      // Clone the person object
      this.editedPerson = { ...this.person };
    }
  }

  onSave(): void {
    if (this.editedPerson) {
      this.savePerson.emit(this.editedPerson);
    }
  }
}