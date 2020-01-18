import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyemailPage } from './verifyemail.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyemailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyemailPageRoutingModule {}
