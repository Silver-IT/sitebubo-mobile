import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeoPageRoutingModule } from './seo-routing.module';
import { SeoPage } from './seo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SeoPageRoutingModule
  ],
  declarations: [SeoPage]
})
export class SeoPageModule {}
