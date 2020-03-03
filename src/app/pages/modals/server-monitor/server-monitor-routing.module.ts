import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerMonitorPage } from './server-monitor.page';

const routes: Routes = [
  {
    path: '',
    component: ServerMonitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerMonitorPageRoutingModule {}
