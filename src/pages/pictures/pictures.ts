import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';


@IonicPage()
@Component({
  selector: 'page-pictures',
  templateUrl: 'pictures.html',
})
export class PicturesPage {

  missions : any;
  Listing = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sqlMission : MissionDbSqlLitProvider,
              public modalCtr : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionsPage');
     // return back
    this.sqlMission.getAllMissions().then(data=> {
      this.missions = data ;
    });
    
  }

  viewis(para){
  if(para == 0)
    this.Listing = false;
  else
    this.Listing = true;
}


  Mission_photos(mission , i){
    mission.type = "pictures";

    let model = this.modalCtr.create('ViewMediaPage',mission);
    model.present();
  }


  
}
