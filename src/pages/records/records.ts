import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';

/**
 * Generated class for the RecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-records',
  templateUrl: 'records.html',
})
export class RecordsPage {
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
  Mission_records(mission : any, i){
    mission.type = "records";
    let model = this.modalCtr.create('ViewMediaPage',mission);
    model.present();
  }

}
