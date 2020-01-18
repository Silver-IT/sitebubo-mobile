import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelMembershipPageRoutingModule } from './cancel-membership-routing.module';

import { CancelMembershipPage } from './cancel-membership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelMembershipPageRoutingModule
  ],
  declarations: [CancelMembershipPage]
})
export class CancelMembershipPageModule {}
