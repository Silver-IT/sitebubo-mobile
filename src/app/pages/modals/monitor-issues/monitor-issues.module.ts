import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MonitorIssuesPageRoutingModule } from './monitor-issues-routing.module';
import { MonitorIssuesPage } from './monitor-issues.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MatExpansionModule,
    MonitorIssuesPageRoutingModule
  ],
  declarations: [MonitorIssuesPage]
})
export class MonitorIssuesPageModule {}
