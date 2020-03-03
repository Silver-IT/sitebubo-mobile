import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelMembershipPage } from './cancel-membership.page';

const routes: Routes = [
  {
    path: '',
    component: CancelMembershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelMembershipPageRoutingModule {}
