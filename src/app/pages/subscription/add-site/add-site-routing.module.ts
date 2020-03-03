import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSitePage } from './add-site.page';

const routes: Routes = [
  {
    path: '',
    component: AddSitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSitePageRoutingModule {}
