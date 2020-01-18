import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleAnalyticsPage } from './google-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleAnalyticsPageRoutingModule {}
