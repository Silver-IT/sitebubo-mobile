import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyprofilePageRoutingModule } from './myprofile-routing.module';

import { MyprofilePage } from './myprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyprofilePageRoutingModule
  ],
  declarations: [MyprofilePage]
})
export class MyprofilePageModule {}
