import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseLanguagePage } from './choose-language';

@NgModule({
  declarations: [
    ChooseLanguagePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseLanguagePage),
  ],
})
export class ChooseLanguagePageModule {}
