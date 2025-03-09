import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class PersonEditorComponent {
  @Input() person: PersonViewModel | null = null;
  @Output() savePerson = new EventEmitter<PersonViewModel>();
  departments$: Observable<DepartmentViewModel[]>;

  constructor(private store: Store) {
    this.departments$ = this.store.select(selectAllDepartments);
  }

  onSave(): void {
    if (this.person) {
      this.savePerson.emit(this.person);
    }
  }
}