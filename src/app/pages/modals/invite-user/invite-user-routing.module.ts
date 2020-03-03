import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteUserPage } from './invite-user.page';

const routes: Routes = [
  {
    path: '',
    component: InviteUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteUserPageRoutingModule {}
