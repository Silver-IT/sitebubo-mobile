import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomainListPageRoutingModule } from './domain-list-routing.module';

import { DomainListPage } from './domain-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DomainListPageRoutingModule
  ],
  declarations: [DomainListPage]
})
export class DomainListPageModule {}
