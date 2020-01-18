import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleAnalyticsPageRoutingModule } from './google-analytics-routing.module';

import { GoogleAnalyticsPage } from './google-analytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GoogleAnalyticsPageRoutingModule
  ],
  declarations: [GoogleAnalyticsPage]
})
export class GoogleAnalyticsPageModule {}
