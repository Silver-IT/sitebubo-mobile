import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionWelcomePage } from './subscription-welcome.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionWelcomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionWelcomePageRoutingModule {}
