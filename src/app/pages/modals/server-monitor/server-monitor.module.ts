import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServerMonitorPageRoutingModule } from './server-monitor-routing.module';

import { ServerMonitorPage } from './server-monitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServerMonitorPageRoutingModule
  ],
  declarations: [ServerMonitorPage]
})
export class ServerMonitorPageModule {}
