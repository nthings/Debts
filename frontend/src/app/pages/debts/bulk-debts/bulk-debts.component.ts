import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as XLSX from 'xlsx';
import { LocalDataSource } from 'ng2-smart-table';
import { PeriodService, PeopleService, DebtsService } from '../../../@core/data';

@Component({
    selector: 'ngx-dialog-bulk-debts',
    templateUrl: './bulk-debts.component.html',
})
export class DialogBulkDebtsComponent implements OnInit {
    @Input() settings: any;
    source;
    sourceLoaded = false;
    period;
    selected = [];
    bulkMode = 'owner';
    bulkId;

    constructor(protected ref: NbDialogRef<DialogBulkDebtsComponent>,
                private periodService: PeriodService,
                private peopleService: PeopleService,
                private debtsService: DebtsService) { }

    ngOnInit() {
        delete this.settings.columns.id;
    }

    periodChange(event) {
        this.period = event.id;
    }

    bulkChange(event) {
        this.bulkId = event.id;
    }

    onUserRowSelect(event) {
        this.selected = event.selected;
    }

    convertFile(event: any) {
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) throw new Error('Solo se puede seleccionar un archivo');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            (async () => {
                /* read workbook */
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });

                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                const tempSource: any = [];
                for (let i = 1; i < data.length; i++) {
                    const record = data[i];
                    if (record[2]) {
                        const period: any = await this.periodService.get(this.period);
                        const row: any = {
                            date: record[0],
                            description: record[1],
                            amount: record[2] + '',
                            period,
                            periodId: period.id,
                        };
                        const monthly_instalments = /\(([^\)]+)\)/g.exec(record[1]);
                        if (monthly_instalments) {
                            row.current_monthly_instalment = parseInt(monthly_instalments[1].split(':')[0], 10);
                            row.monthly_instalment = parseInt(monthly_instalments[1].split(':')[1], 10);
                            row.recurrent = true;
                        }
                        tempSource.push(row);
                    }
                }
                this.source = new LocalDataSource();
                this.source.load(await this.debtsService.clean(tempSource));
                this.sourceLoaded = true;
            })();
        };
        reader.readAsBinaryString(target.files[0]);
    }

    async onCreate(event) {
        this.source.update(event.data, await this.cleanData(event.newData));
        event.confirm.resolve();
    }

    async onEdit(event) {
        this.source.update(event.data, await this.cleanData(event.newData));
        event.confirm.resolve();
    }

    onDelete(event): void {
        event.confirm.resolve();
    }

    async bulkAssign() {
        for (const row of this.selected) {
            if (this.bulkMode === 'owner') {
                row.ownerId = this.bulkId;
                row.owner = await this.peopleService.get(this.bulkId);
            }
            if (this.bulkMode === 'period') {
                row.periodId = this.bulkId;
                row.period = await this.periodService.get(this.bulkId);
            }
            this.source.update(row, row);
        }
    }

    cancel() {
        this.ref.close();
    }

    async submit() {
        this.ref.close(await this.source.getAll());
    }

    async cleanData(data) {
        const copy = {...data};
        if (copy.owner && copy.owner['foreignKey'] === 'ownerId') {
            copy.ownerId = copy.owner['id'];
            copy.owner = await this.peopleService.get(copy.owner['id']);
        }
        if (copy.period && copy.period['foreignKey'] === 'periodId') {
            copy.period = await this.periodService.get(copy.period['id']);
        }
        return copy;
    }
}
