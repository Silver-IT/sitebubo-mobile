import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExDomainsPage } from './ex-domains.page';

const routes: Routes = [
  {
    path: '',
    component: ExDomainsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExDomainsPageRoutingModule {}
