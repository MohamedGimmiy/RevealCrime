import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';
import { CallNumber } from '@ionic-native/call-number';



@IonicPage()
@Component({
  selector: 'page-phones',
  templateUrl: 'phones.html',
})
export class PhonesPage {

  phoneList : any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sql : MissionDbSqlLitProvider,
              public call : CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonesPage');
    this.sql.getphoneList().then(data=>{
      this.phoneList = data;
    });
  }

  callNumber(thing){
    this.call.callNumber(thing.number,true).catch(err=>{
      console.log("error calling number", err.message);
    });

  }
}
