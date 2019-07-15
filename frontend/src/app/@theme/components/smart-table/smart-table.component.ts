import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Data } from '../../../@core/data/data';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
    selector: 'ngx-smart-table',
    template: `
        <nb-card>
            <nb-card-header>
                {{ tableTitle }}
            </nb-card-header>

            <nb-card-body style="min-height: 75vh;">
                <ng2-smart-table
                    [settings]="settings"
                    [source]="source"
                    (createConfirm)="onCreateConfirm($event)"
                    (deleteConfirm)="onDeleteConfirm($event)"
                    (editConfirm)="onEditConfirm($event)"
                >
                </ng2-smart-table>
            </nb-card-body>
        </nb-card>`,
})
export class SmartTableComponent {
    tableTitle = '';
    settings = {
        noDataMessage: 'No Hay Datos :(',
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
    };
    overrideSettings = {};
    columns = {};
    source: LocalDataSource = new LocalDataSource();
    toastrOptions = {
        destroyByClick: true,
        duration: 2000,
        hasIcon: true,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        preventDuplicates: false,
    };

    constructor(private service: Data,
        private dialogsvc: NbDialogService,
        private toastr: NbToastrService) {
        this.getData();
    }

    getData(toastrTitle = null) {
        (async () => {
            const data = await this.service.getData();
            this.source.load(data as any[]);
            if (toastrTitle) {
                this.toastr.show(`Tabla ${this.tableTitle}`, toastrTitle, {
                    ...this.toastrOptions, status: NbToastStatus.SUCCESS});
            }
        })();
    }

    onCreateConfirm(event): void {
        this.dialogsvc.open(DialogConfirmComponent, {
            context: {
                mode: 'crear',
            },
        }).onClose.subscribe(confirm => {
            if (confirm) {
                (async () => {
                    try {
                        await this.service.insert(this.cleanData(event.newData));
                        event.confirm.resolve();
                        this.toastr.show(`Tabla ${this.tableTitle}`, 'Registro Creado Correctamente', {
                            ...this.toastrOptions, status: NbToastStatus.SUCCESS});
                        this.getData();
                    } catch (err) {
                        this.toastr.show(err.message, {...this.toastrOptions, status: NbToastStatus.DANGER});
                    }
                })();
            } else {
                event.confirm.reject();
            }
        });
    }

    onEditConfirm(event): void {
        this.dialogsvc.open(DialogConfirmComponent, {
            context: {
                mode: 'editar',
            },
        }).onClose.subscribe(confirm => {
            if (confirm) {
                (async () => {
                    try {
                        await this.service.update(event.newData.id, this.cleanData(event.newData));
                        this.toastr.show(`Tabla ${this.tableTitle}`, 'Registro Editado Correctamente', {
                            ...this.toastrOptions, status: NbToastStatus.SUCCESS});
                        event.confirm.resolve();
                        this.getData();
                    } catch (err) {
                        this.toastr.show(err.message, {...this.toastrOptions, status: NbToastStatus.DANGER});
                    }
                })();
            } else {
                event.confirm.reject();
            }
        });
    }

    onDeleteConfirm(event): void {
        this.dialogsvc.open(DialogConfirmComponent, {
            context: {
                mode: 'eliminar',
            },
        }).onClose.subscribe(confirm => {
            if (confirm) {
                (async () => {
                    try {
                        const id = event.data.id;
                        if (id) {
                            await this.service.delete(id);
                            this.toastr.show(`Tabla ${this.tableTitle}`, 'Registro Eliminado Correctamente', {
                                ...this.toastrOptions, status: NbToastStatus.SUCCESS});
                            event.confirm.resolve();
                            this.getData();
                        } else {
                            throw new Error('ID indefinido');
                        }
                    } catch (err) {
                        this.toastr.show(err.message, {...this.toastrOptions, status: NbToastStatus.DANGER});
                    }
                })();
            } else {
                event.confirm.reject();
            }
        });
    }

    private cleanData(data) {
        const copy = JSON.parse(JSON.stringify(data));
        Object.keys(copy).forEach((key) => {
            if (copy[key] == null || copy[key] === '') {
                delete copy[key];
            }
            if (copy[key] && copy[key]['foreignKey']) {
                copy[copy[key]['foreignKey']] = copy[key]['id'];
                delete copy[key];
            }
        });
        return copy;
    }
}
