import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Cell, DefaultEditor } from 'ng2-smart-table';

@Component({
    selector: 'ngx-color-picker',
    template: `<input
        class="form-control"
        [(colorPicker)]="cell.newValue"
        [style.background]="cell.newValue"
        [value]="cell.newValue"
        cpPosition="left"
        cpOKButton="true"
    />`,
})
export class ColorPickerComponent extends DefaultEditor {
    @Input() cell: Cell;
    @Input() inputClass: string;

    @Output() onStopEditing = new EventEmitter<any>();
    @Output() onEdited = new EventEmitter<any>();
    @Output() onClick = new EventEmitter<any>();
}

