import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorIssuesPage } from './monitor-issues.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorIssuesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorIssuesPageRoutingModule {}
