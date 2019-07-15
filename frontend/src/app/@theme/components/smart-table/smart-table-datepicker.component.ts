import { Component, OnInit, Input } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';

@Component({
    selector: 'ngx-smart-table-datepicker',
    template: `
        <input
            class="w-100"
            nbInput
            [(ngModel)]="cell.newValue"
            [placeholder]="placeholder"
            [nbDatepicker]="formpicker"
            readonly
        >
        <nb-datepicker #formpicker format="YYYY-MM-DD"></nb-datepicker>
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
export class SmartTableDatepickerComponent extends DefaultEditor implements OnInit {
    @Input() placeholder: string = 'Escoge una Fecha';

    constructor() {
        super();
    }

    ngOnInit() {
    }
}

@Component({
    template: `{{value | date:'longDate'}}`,
})
export class SmartTableDatepickerRenderComponent implements ViewCell, OnInit {
    @Input() value: string;
    @Input() rowData: any;

    constructor() { }

    ngOnInit() { }

}
