import { Component } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav : NavController,
              public platform : Platform){

  }

  // --------------------------- navigation ----------------------------- //
  navigate(i){
    if(i==1){
      this.nav.push('HomeTwoPage');
    }else if (i==2){
      this.nav.push('TutorialsPage');
    } else
    this.platform.exitApp(); // close the app
  }

}
