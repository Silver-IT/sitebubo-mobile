import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailedPlanPageRoutingModule } from './detailed-plan-routing.module';

import { DetailedPlanPage } from './detailed-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailedPlanPageRoutingModule
  ],
  declarations: [DetailedPlanPage]
})
export class DetailedPlanPageModule {}
