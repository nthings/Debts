import { Component } from '@angular/core';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SmartTableComponent } from '../../@theme/components';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { PasswordSetterComponent } from './password-setter/password-setter.component';
import { PeopleService } from '../../@core/data/people.service';

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
        email: {
            title: 'Email',
            type: 'string',
        },
        password: {
            title: 'Contraseña',
            type: 'html',
            filter: false,
            valuePrepareFunction: (cell, row) => {
                return this.sanitizer.bypassSecurityTrustHtml(
                    `<div class="w-100">${(cell.substring(0, 4)).replace(/./g, '*')}</div>`,
                );
            },
            editable: false,
            editor: {
                type: 'custom',
                component: PasswordSetterComponent,
            },
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

    constructor(protected peopleService: PeopleService,
        protected dialogService: NbDialogService,
        private sanitizer: DomSanitizer,
        protected toastrService: NbToastrService) {
        super(peopleService, dialogService, toastrService);
        this.settings = Object.assign(
            this.overrideSettings,
            this.settings,
            { columns: this.columns },
        );
    }
}
