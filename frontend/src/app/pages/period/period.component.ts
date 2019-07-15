import { Component } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import {
    SmartTableComponent,
    SmartTableDatepickerRenderComponent,
    SmartTableDatepickerComponent,
} from '../../@theme/components';
import { PeriodService } from '../../@core/data/period.service';

const componentOptions = Object.assign(
    {},
    { template: (<any>SmartTableComponent).__annotations__[0]['template'] },
    { selector: 'ngx-period' },
);
@Component(componentOptions)
export class PeriodComponent extends SmartTableComponent {
    tableTitle = 'Periodo';
    columns = {
        id: {
            title: 'ID',
            type: 'number',
            editable: false,
            addable: false,
        },
        start_date: {
            title: 'Fecha de Inicio',
            type: 'custom',
            renderComponent: SmartTableDatepickerRenderComponent,
            width: '250px',
            filter: false,
            sortDirection: 'desc',
            editor: {
                type: 'custom',
                component: SmartTableDatepickerComponent,
            },
        },
        end_date: {
            title: 'Fecha Final',
            type: 'custom',
            renderComponent: SmartTableDatepickerRenderComponent,
            width: '250px',
            filter: false,
            editor: {
                type: 'custom',
                component: SmartTableDatepickerComponent,
                config: {
                    placeholder: 'Testing changing',
                },
            },
        },
        amount_no_interests: {
            title: 'Cantidad Para No Generar Intereses',
            type: 'number',
        },
    };

    constructor(protected periodService: PeriodService,
        protected dialogService: NbDialogService,
        protected toastrService: NbToastrService) {
            super(periodService, dialogService, toastrService);
        this.settings = Object.assign(
            this.overrideSettings,
            this.settings,
            { columns: this.columns },
        );
    }
}
