import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationSettingPageRoutingModule } from './notification-setting-routing.module';

import { NotificationSettingPage } from './notification-setting.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MatExpansionModule,
    NotificationSettingPageRoutingModule
  ],
  declarations: [NotificationSettingPage]
})
export class NotificationSettingPageModule {}
