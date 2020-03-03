import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MorePageRoutingModule } from './more-routing.module';
import { MorePage } from './more.page';
import { ComponentsModule } from 'src/app/components/components.module';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MorePageRoutingModule,
    // Ng2GoogleChartsModule
  ],
  declarations: [MorePage]
})
export class MorePageModule {}
