import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeedPage } from './speed.page';

const routes: Routes = [
  {
    path: '',
    component: SpeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeedPageRoutingModule {}
