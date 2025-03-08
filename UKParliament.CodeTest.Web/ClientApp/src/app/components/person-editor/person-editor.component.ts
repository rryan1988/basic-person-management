import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PersonViewModel } from '../../models/person-view-model';

@Component({
  selector: 'person-editor',
  templateUrl: './person-editor.html',
  styleUrls: ['./person-editor.scss'],
  standalone: false
})
export class PersonEditorComponent {
  @Input() person: PersonViewModel | null = null;
  @Output() savePerson = new EventEmitter<PersonViewModel>();

  onSave(): void {
    if (this.person) {
      this.savePerson.emit(this.person);
    }
  }
}