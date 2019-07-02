import { NgModule } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    imports: [
        ColorPickerModule,
    ],
    exports: [],
    declarations: [
        ColorPickerComponent,
    ],
    entryComponents: [
        ColorPickerComponent,
    ],
})
export class ColorPickerInputModule { }
