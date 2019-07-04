import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PeopleComponent } from './people.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { PasswordSetterComponent } from './password-setter/password-setter.component';

@NgModule({
    imports: [
        ThemeModule,
        ColorPickerModule,
    ],
    exports: [],
    declarations: [
        PeopleComponent,
        ColorPickerComponent,
        PasswordSetterComponent,
    ],
    entryComponents: [
        ColorPickerComponent,
        PasswordSetterComponent,
    ],
})
export class PeopleModule { }
