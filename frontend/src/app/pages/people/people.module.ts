import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PeopleComponent } from './people.component';
import { ColorPickerInputModule } from './color-picker/color-picker.module';

@NgModule({
    imports: [
        ThemeModule,
        ColorPickerInputModule,
    ],
    exports: [],
    declarations: [
        PeopleComponent,
    ],
})
export class PeopleModule { }
