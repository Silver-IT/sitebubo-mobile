import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExDomainsPageRoutingModule } from './ex-domains-routing.module';
import { ExDomainsPage } from './ex-domains.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExDomainsPageRoutingModule
  ],
  declarations: [ExDomainsPage]
})
export class ExDomainsPageModule {}
