import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';



@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  missions : any;
  Listing = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sqlMission : MissionDbSqlLitProvider,
              public modalCtr : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionsPage');
    // return to original
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
  Mission_videos(mission , i){
    mission.type = "videos";

    let model = this.modalCtr.create('ViewMediaPage',mission);
    model.present();
  }
}