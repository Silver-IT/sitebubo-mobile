import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSitePageRoutingModule } from './add-site-routing.module';

import { AddSitePage } from './add-site.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddSitePageRoutingModule
  ],
  declarations: [AddSitePage]
})
export class AddSitePageModule {}
