import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { PeopleComponent } from './people.component';

@NgModule({
    imports: [
        ThemeModule,
        Ng2SmartTableModule,
    ],
    exports: [],
    declarations: [
        PeopleComponent,
    ],
})
export class PeopleModule { }
