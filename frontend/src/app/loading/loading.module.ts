import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    LoadingComponent,
  ],
})
export class LoadingModule { }
