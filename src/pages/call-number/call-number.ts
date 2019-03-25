import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';


@IonicPage()
@Component({
  selector: 'page-call-number',
  templateUrl: 'call-number.html',
})
export class CallNumberPage {

  // add a phone number 
  name : any;
  tel : any;
  id : any;

  // cal number 
  phoneList : string;
  mynum : any;
  // getting name of person who you need to call
  pname : any;

  // ----------------- phone calling ------------- //
  phonecalling : any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public call : CallNumber,
              public sql : MissionDbSqlLitProvider) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CallNumberPage');

    // ------------- get list of phones ---------------//
    this.sql.getphoneList().then(data=>{
      this.phonecalling = data;
    });

  }


  addNumber(){
    // insert number in db
    this.sql.InsertAphoneNumber(this.name , this.tel , this.id)
    .then(()=>{
      this.navCtrl.setRoot('ModesPage'); // go to modes page again
    })
    .catch(err=>{
      console.log("error insert number", err.message);
    });
  }

  callNumber(){

    let mya =[];
    mya = this.phonecalling;
    for( let i = 0 ; i< this.phonecalling.length ; i++){
      console.log("phonList",this.phoneList);
      console.log("this.phoncalling", mya[i].name);

      if(this.phoneList.toString() == mya[i].name ){
        console.log(this.mynum,"mynum")
        this.mynum = mya[i].number;

      }
    }
    // call the number now

    console.log(this.mynum,"my m umber")
    this.call.callNumber(this.mynum,true).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log("error calling number",err.message);
    });
  }
}
