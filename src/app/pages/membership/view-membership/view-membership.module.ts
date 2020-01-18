import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewMembershipPageRoutingModule } from './view-membership-routing.module';
import { ViewMembershipPage } from './view-membership.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewMembershipPageRoutingModule
  ],
  declarations: [ViewMembershipPage]
})
export class ViewMembershipPageModule {}
