import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Cell, DefaultEditor } from 'ng2-smart-table';

@Component({
    selector: 'ngx-color-picker',
    template: `<input
        class="form-control"
        type="password"
        [(ngModel)]="cell.newValue"
    />`,
    styles: [`
        input {
            padding: .375em .75em !important;
        }
    `],
})
export class PasswordSetterComponent extends DefaultEditor {
    @Input() cell: Cell;
    @Input() inputClass: string;

    @Output() onStopEditing = new EventEmitter<any>();
    @Output() onEdited = new EventEmitter<any>();
    @Output() onClick = new EventEmitter<any>();
}

