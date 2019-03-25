import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModesPage } from './modes';

@NgModule({
  declarations: [
    ModesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModesPage),
  ],
})
export class ModesPageModule {}
