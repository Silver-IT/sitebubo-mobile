import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SpeedPageRoutingModule } from './speed-routing.module';
import { SpeedPage } from './speed.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SpeedPageRoutingModule
  ],
  declarations: [SpeedPage]
})
export class SpeedPageModule {}
