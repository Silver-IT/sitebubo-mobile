import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from './../../../components/components.module';
import { SubscriptionWelcomePage } from './subscription-welcome.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionWelcomePage
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
  declarations: [SubscriptionWelcomePage]
})
export class SubscriptionWelcomePageModule {}
