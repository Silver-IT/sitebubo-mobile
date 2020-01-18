import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationListPageRoutingModule } from './notification-list-routing.module';

import { NotificationListPage } from './notification-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MatExpansionModule,
    NotificationListPageRoutingModule
  ],
  declarations: [NotificationListPage]
})
export class NotificationListPageModule {}
