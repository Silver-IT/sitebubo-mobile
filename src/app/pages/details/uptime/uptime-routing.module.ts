import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UptimePage } from './uptime.page';

const routes: Routes = [
  {
    path: '',
    component: UptimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UptimePageRoutingModule {}
