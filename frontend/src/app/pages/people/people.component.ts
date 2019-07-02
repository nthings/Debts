import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SmartTableComponent } from '../../@theme/components';
import { PeopleData } from '../../@core/mock/people.service';
import { NbDialogService } from '@nebular/theme';

const componentOptions = Object.assign(
    {},
    { template: (<any>SmartTableComponent).__annotations__[0]['template'] },
    { selector: 'ngx-people' },
);
@Component(componentOptions)
export class PeopleComponent extends SmartTableComponent {
    tableTitle = 'Personas';
    columns = {
        id: {
            title: 'ID',
            type: 'number',
            editable: false,
            addable: false,
        },
        name: {
            title: 'Nombre',
            type: 'string',
        },
        username: {
            title: 'Nombre de Usuario',
            type: 'string',
        },
        color: {
            title: 'Color',
            type: 'html',
            filter: false,
            valuePrepareFunction: (cell, row) => {
                return this.sanitizer.bypassSecurityTrustHtml(
                    `<div class="w-100" style="background-color: ${cell};" >${cell}</div>`,
                );
            },
            editable: false,
            editor: {
                type: 'custom',
                component: ColorPickerComponent,
            },
        },
    };

    constructor(private peopleService: PeopleData,
        private dialogService: NbDialogService,
        private sanitizer: DomSanitizer) {
        super(peopleService, dialogService);
        this.settings = Object.assign(
            this.overrideSettings,
            this.settings,
            { columns: this.columns },
        );
    }
}
