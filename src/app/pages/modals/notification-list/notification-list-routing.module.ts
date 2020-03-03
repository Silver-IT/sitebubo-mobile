import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationListPage } from './notification-list.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationListPageRoutingModule {}
