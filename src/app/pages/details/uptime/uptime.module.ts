import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UptimePageRoutingModule } from './uptime-routing.module';
import { UptimePage } from './uptime.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    UptimePageRoutingModule
  ],
  declarations: [UptimePage]
})
export class UptimePageModule {}
