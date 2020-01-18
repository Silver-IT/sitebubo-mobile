import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionWelcomePageRoutingModule } from './subscription-welcome-routing.module';

import { SubscriptionWelcomePage } from './subscription-welcome.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SubscriptionWelcomePageRoutingModule
  ],
  declarations: [SubscriptionWelcomePage]
})
export class SubscriptionWelcomePageModule {}
