import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Data } from '../../../@core/data/data';
import { NbDialogService } from '@nebular/theme';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

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

    constructor(private service: Data,
                private dialogsvc: NbDialogService) {
        (async () => {
            const data = await this.service.getData();
            this.source.load(data);
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
                    await this.service.insert(event.newData);
                    this.source.refresh();
                    event.confirm.resolve();
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
                    await this.service.update(event.newData.id, event.newData);
                    this.source.refresh();
                    event.confirm.resolve();
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
                    await this.service.delete(event.data.id);
                    this.source.refresh();
                    event.confirm.resolve();
                })();
            } else {
                event.confirm.reject();
            }
        });
    }
}
