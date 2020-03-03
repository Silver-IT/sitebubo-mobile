import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDomainPageRoutingModule } from './add-domain-routing.module';

import { AddDomainPage } from './add-domain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddDomainPageRoutingModule
  ],
  declarations: [AddDomainPage]
})
export class AddDomainPageModule {}
