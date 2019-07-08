import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DebtsComponent } from './debts.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    exports: [],
    declarations: [
        DebtsComponent,
    ],
})
export class DebtsModule { }
