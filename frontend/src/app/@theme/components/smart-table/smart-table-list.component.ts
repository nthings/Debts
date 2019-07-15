import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefaultEditor, Cell } from 'ng2-smart-table';

@Component({
    selector: 'ngx-smart-list',
    template: `
    <nb-select
        [ngModel]="stringify(cell.newValue)"
        (ngModelChange)="modelChange($event)"
    >
        <nb-option *ngFor="let option of options" [value]="stringify(option.value)">{{ option.text }}</nb-option>
    </nb-select>
  `,
  styles: [`
    .fa {
        font-size: 1.2rem;
    }

    input {
        padding: .375em .75em !important;
    }
  `],
})
export class SmartTableListComponent extends DefaultEditor implements OnInit {
    @Input()
    placeholder: string = 'Escoge una opción';

    @Input()
    data;

    @Output()
    customOnStopEditing = new EventEmitter();

    options = [];

    constructor() {
        super();
    }

    ngOnInit() {
        (async () => {
            if (this.data) {
                this.cell = new Cell(null, null, null, null);
                this.options = await this.data();
                this.onStopEditing = new DefaultEditor().onStopEditing;
            } else {
                this.options = await this.cell['column'].editor.config.data();
                this.placeholder = this.cell['column'].editor.config.placeholder;
                if (this.cell.newValue) {
                    this.cell.newValue = {
                        id: this.cell.newValue.id,
                        foreignKey: this.cell['column'].editor.config.foreignKey,
                    };
                }
            }
        })();
    }

    modelChange(event) {
        this.cell.newValue = this.parse(event);
        this.customOnStopEditing.emit(this.cell.newValue);
    }

    stringify(obj) {
        return JSON.stringify(obj);
    }

    parse(obj) {
        return JSON.parse(obj);
    }
}
