import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DebtsComponent } from './debts.component';
import { DialogBulkDebtsComponent } from './bulk-debts/bulk-debts.component';
import { NbDialogService } from '@nebular/theme';

@NgModule({
    imports: [
        ThemeModule,
    ],
    exports: [],
    declarations: [
        DebtsComponent,
        DialogBulkDebtsComponent,
    ],
    entryComponents: [
        DialogBulkDebtsComponent,
    ],
    providers: [
        NbDialogService,
    ],
})
export class DebtsModule { }
