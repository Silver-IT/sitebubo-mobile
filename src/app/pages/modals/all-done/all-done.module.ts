import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllDonePageRoutingModule } from './all-done-routing.module';

import { AllDonePage } from './all-done.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllDonePageRoutingModule
  ],
  declarations: [AllDonePage]
})
export class AllDonePageModule {}
