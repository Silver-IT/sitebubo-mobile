import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DomainScanPageRoutingModule } from './domain-scan-routing.module';
import { DomainScanPage } from './domain-scan.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DomainScanPageRoutingModule
  ],
  declarations: [DomainScanPage]
})
export class DomainScanPageModule {}
