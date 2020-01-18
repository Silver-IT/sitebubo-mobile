import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InviteUserPageRoutingModule } from './invite-user-routing.module';

import { InviteUserPage } from './invite-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InviteUserPageRoutingModule
  ],
  declarations: [InviteUserPage]
})
export class InviteUserPageModule {}
