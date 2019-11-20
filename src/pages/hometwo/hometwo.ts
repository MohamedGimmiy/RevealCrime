import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Platform, Events } from 'ionic-angular';


import { File } from '@ionic-native/file';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';

@IonicPage()
@Component({
  selector: 'page-hometwo',
  templateUrl: 'hometwo.html',
})
export class HomeTwoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl :AlertController,
              public toastCtrl : ToastController,
              public file : File,
              public sqlMission : MissionDbSqlLitProvider,
              public platform : Platform,
              public sql : MissionDbSqlLitProvider,
              public event : Events) {
}

  visiable : any;
  missionsArray : any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad Home2Page');

    // return back
      this.event.subscribe('initOfDatabase' , ()=>{
        this.sql.getAllMissions().then(data=>{
          this.missionsArray = data;
          
          if(this.missionsArray.length >0){
            this.visiable = true;
            console.log(this.missionsArray , "MissionArray")
          }
        });
      });

// return back
      this.sql.getAllMissions().then(data=>{
        this.missionsArray = data;

        if(this.missionsArray.length >0){
          this.visiable = true;
          console.log(this.missionsArray , "MissionArray")
        }
      });


  }
  navigate(i){ // navigate to missions

    if(i == 1){ // go to missions
      this.navCtrl.push('MissionsPage',{
        flage : true
      });
    } else if( i == 2){
      this.navCtrl.push('TutorialsPage');
    } else if( i == 3){
      this.close();
    }

  }
  // ------------------------ show toast ---------------------//
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Mission created successfully',
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }



  //------------------------ alert function ---------------- //
  createMission() {
    let alert = this.alertCtrl.create({
      title: 'Create a mission',
      
      inputs: [
        {
          name: 'missionname',
          placeholder: 'Mission name',
        },
        {
          name: 'description',
          placeholder: 'description',
          type : 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },

        },
        {
          text: 'create',
          handler: data => {
            // ---------------- sqlLite qurey TODO------------------ //
            // ---------------- insert a mission ----------------//
            let dataObject = {name:data.missionname,description : data.description}
            // return this code again
             let u =this.sqlMission.InsertAmission(dataObject);
            console.log(u) 
            console.log("ceate a Mission Modes Page")
            this.presentToast();
            this.navCtrl.push('ModesPage',{
              "name" : data.missionname,
              "description" : data.description
            });
          }
        }
      ],
      cssClass : 'alertcustom',

    });
    alert.present();
  }

    //------------------ close ionic application -------------------- //
    close(){
      let alert =this.alertCtrl.create({
        title : "Exite",
        message :"Do you want to Exite",
        buttons :[{
          text : "Yes",
          handler:()=>{
            this.platform.exitApp();
          }
        },
        {
          text :  "No",
          role : "cancel",
          handler :()=>{
            console.log("Error Connection");
          }
        }
  
        ]
      });
  
      alert.present();
    }
}
