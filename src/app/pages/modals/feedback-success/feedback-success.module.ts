import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackSuccessPageRoutingModule } from './feedback-success-routing.module';

import { FeedbackSuccessPage } from './feedback-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackSuccessPageRoutingModule
  ],
  declarations: [FeedbackSuccessPage]
})
export class FeedbackSuccessPageModule {}
