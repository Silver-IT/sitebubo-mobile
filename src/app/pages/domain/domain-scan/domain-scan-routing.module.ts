import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomainScanPage } from './domain-scan.page';

const routes: Routes = [
  {
    path: '',
    component: DomainScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomainScanPageRoutingModule {}
