import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PeriodComponent } from './period.component';

@NgModule({
    imports: [
        ThemeModule,
    ],
    exports: [],
    declarations: [
        PeriodComponent,
    ],
})
export class PeriodModule { }
