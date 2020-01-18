import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SecurityPageRoutingModule } from './security-routing.module';
import { SecurityPage } from './security.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SecurityPageRoutingModule
  ],
  declarations: [SecurityPage]
})
export class SecurityPageModule {}
