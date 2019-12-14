import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonitorIssuesPage } from './monitor-issues.page';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Routes = [
  {
    path: '',
    component: MonitorIssuesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitorIssuesPage]
})
export class MonitorIssuesPageModule {}
