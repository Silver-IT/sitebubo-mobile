import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeebackSuccessPage } from './feeback-success.page';

const routes: Routes = [
  {
    path: '',
    component: FeebackSuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeebackSuccessPage]
})
export class FeebackSuccessPageModule {}
