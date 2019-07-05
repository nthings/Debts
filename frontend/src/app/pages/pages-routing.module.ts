import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PeopleComponent } from './people/people.component';
import { PeriodComponent } from './period/period.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'people',
      component: PeopleComponent,
    },
    {
      path: 'period',
      component: PeriodComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
