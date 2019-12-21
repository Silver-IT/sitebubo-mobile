import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationSettingPage } from './notification-setting.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationSettingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationSettingPage]
})
export class NotificationSettingPageModule {}
