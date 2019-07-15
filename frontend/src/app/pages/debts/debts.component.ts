import { Component } from '@angular/core';
import {
    SmartTableComponent,
    SmartTableDatepickerRenderComponent,
    SmartTableDatepickerComponent,
    SmartTableListComponent,
} from '../../@theme/components';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DebtsService, PeopleService, PeriodService } from '../../@core/data';
import { DatePipe } from '@angular/common';
import { DialogBulkDebtsComponent } from './bulk-debts/bulk-debts.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
    selector: 'ngx-debts',
    templateUrl: './debts.component.html',
    providers: [DatePipe],
})
export class DebtsComponent extends SmartTableComponent {
    tableTitle = 'Deudas';
    columns = {
        id: {
            title: 'ID',
            type: 'number',
            editable: false,
            addable: false,
        },
        date: {
            title: 'Fecha',
            type: 'custom',
            renderComponent: SmartTableDatepickerRenderComponent,
            filter: false,
            sortDirection: 'desc',
            editor: {
                type: 'custom',
                component: SmartTableDatepickerComponent,
            },
        },
        description: {
            title: 'Descripción',
            type: 'string',
        },
        custom_description: {
            title: 'Descripción Amigable',
            type: 'string',
        },
        amount: {
            title: 'Cantidad',
            type: 'string',
        },
        monthly_instalment: {
            title: 'Total de Mensualidades',
            type: 'number',
        },
        current_monthly_instalment: {
            title: 'Mensualidad Actual',
            type: 'number',
        },
        recurrent: {
            title: 'Recurrente',
            type: 'html',
            filter: false,
            valuePrepareFunction: (cell, row) => {
                return cell ? '✓' : '✕';
            },
            editor: {
                type: 'checkbox',
            },
        },
        payed: {
            title: 'Pagada',
            type: 'html',
            filter: false,
            valuePrepareFunction: (cell, row) => {
                return cell ? '✓' : '✕';
            },
            editor: {
                type: 'checkbox',
            },
        },
        date_payed: {
            title: 'Fecha de Pago',
            type: 'custom',
            renderComponent: SmartTableDatepickerRenderComponent,
            filter: false,
            sortDirection: 'desc',
            editor: {
                type: 'custom',
                component: SmartTableDatepickerComponent,
            },
        },
        owner: {
            title: 'Persona',
            type: 'html',
            valuePrepareFunction: (cell, row) => {
                return row.owner ? row.owner.name : 'SIN DUEÑO';
            },
            editor: {
                type: 'custom',
                component: SmartTableListComponent,
                config: {
                    placeholder: 'Elige un dueño',
                    data: async () => {
                        const data: any = await this.peopleService.getData();
                        const temp = [];
                        for (const obj of data) {
                            temp.push({
                                value: {
                                    id: obj.id,
                                    foreignKey: 'ownerId',
                                },
                                text: obj.name,
                            });
                        }
                        return temp;
                    },
                    foreignKey: 'ownerId',
                },
            },
        },
        period: {
            title: 'Periodo',
            type: 'html',
            filter: false,
            valuePrepareFunction: (cell, row) => {
                if (row.period) {
                    const startDate = this.datePipe.transform(row.period.start_date, 'longDate');
                    const endDate = this.datePipe.transform(row.period.end_date, 'longDate');
                    return `${startDate}-${endDate}`;
                } else {
                    return 'SIN PERIODO';
                }
            },
            editor: {
                type: 'custom',
                component: SmartTableListComponent,
                config: {
                    placeholder: 'Elige un periodo',
                    data: async () => {
                        const data: any = await this.periodService.getData();
                        const temp = [];
                        for (const obj of data) {
                            const startDate = this.datePipe.transform(obj.start_date, 'longDate');
                            const endDate = this.datePipe.transform(obj.end_date, 'longDate');
                            temp.push({
                                value: {
                                    id: obj.id,
                                    foreignKey: 'periodId',
                                },
                                text: `${startDate}-${endDate}`,
                            });
                        }
                        return temp;
                    },
                    foreignKey: 'periodId',
                },
            },
        },
    };
    total = 0;
    owner;
    period;

    constructor(protected debtsService: DebtsService,
        protected dialogService: NbDialogService,
        protected toastrService: NbToastrService,
        private peopleService: PeopleService,
        private periodService: PeriodService,
        private datePipe: DatePipe) {
        super(debtsService, dialogService, toastrService);
        this.settings = Object.assign(
            this.overrideSettings,
            this.settings,
            { columns: this.columns },
        );
    }

    openBulkDebts() {
        this.dialogService.open(DialogBulkDebtsComponent, {
            closeOnBackdropClick: false,
            closeOnEsc: false,
            hasScroll: false,
            context: {
                settings: {...this.settings},
            },
        }).onClose.subscribe(newData => {
            if (newData) {
                (async () => {
                    try {
                        await this.debtsService.insertBatch(this.cleanArrayData(newData));
                        this.toastrService.show(`Tabla ${this.tableTitle}`, 'Registros Creados Correctamente', {
                            ...this.toastrOptions, status: NbToastStatus.SUCCESS});
                        this.getData();
                    } catch (err) {
                        this.toastrService.show(err.message, {...this.toastrOptions, status: NbToastStatus.DANGER});
                    }
                })();
            } else {
                // event.confirm.reject();
            }
        });
    }

    cleanArrayData(data) {
        for (const row of data) {
            Object.keys(row).forEach((key) => {
                if (row[key] == null || row[key] === '') {
                    delete row[key];
                }
                if (row[key] && row[key]['foreignKey']) {
                    row[row[key]['foreignKey']] = row[key]['id'];
                    delete row[key];
                }
            });
        }
        return data;
    }

    async ownerFilter(event) {
        this.owner = event.id;
        await this.commonFilter();
    }

    async periodFilter(event) {
        this.period = event.id;
        await this.commonFilter();
    }

    async commonFilter() {
        if (this.owner && this.period) {
            const data: any = await this.debtsService.getByOwnerPeriod(this.owner, this.period);
            this.total = 0;
            for (const row of data) {
                this.total += parseFloat(row.amount);
            }
            this.source.load(data);
        }
    }

    clean() {
        this.owner = null;
        this.period = null;
        this.total = 0;
        this.getData();
    }

}
