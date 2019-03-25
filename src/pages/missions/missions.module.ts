import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionsPage } from './missions';

@NgModule({
  declarations: [
    MissionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionsPage),
  ],
})
export class MissionsPageModule {}
