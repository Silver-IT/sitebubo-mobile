import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMembershipPage } from './view-membership.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMembershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMembershipPageRoutingModule {}
