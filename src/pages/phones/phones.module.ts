import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhonesPage } from './phones';

@NgModule({
  declarations: [
    PhonesPage,
  ],
  imports: [
    IonicPageModule.forChild(PhonesPage),
  ],
})
export class PhonesPageModule {}
