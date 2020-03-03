import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDomainPage } from './add-domain.page';

const routes: Routes = [
  {
    path: '',
    component: AddDomainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDomainPageRoutingModule {}
