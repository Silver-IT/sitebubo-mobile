import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyemailPageRoutingModule } from './verifyemail-routing.module';

import { VerifyemailPage } from './verifyemail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyemailPageRoutingModule
  ],
  declarations: [VerifyemailPage]
})
export class VerifyemailPageModule {}
