import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DomainListPage } from './domain-list.page';
import { ComponentsModule } from './../../../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: DomainListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DomainListPage]
})
export class DomainListPageModule {}
