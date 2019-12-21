import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DomainScanPage } from './domain-scan.page';

const routes: Routes = [
  {
    path: '',
    component: DomainScanPage
  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DomainScanPage]
})
export class DomainScanPageModule {}
