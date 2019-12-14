import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CancelMembershipPage } from './cancel-membership.page';

const routes: Routes = [
  {
    path: '',
    component: CancelMembershipPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CancelMembershipPage]
})
export class CancelMembershipPageModule {}
