import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { File, FileEntry } from '@ionic-native/file';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';
import { Media, MediaObject } from '@ionic-native/media';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-missions',
  templateUrl: 'missions.html',
})
export class MissionsPage {

 // textFile : any;

 missions : any;
 continue = false;
 missioninfo = '';
 // ---------------- modes --------------- //

 fileName : any;
 filePath : any;
 audio : MediaObject;
 recording : any;
 audioList : [any];

 mission_id : any;

currentMission : any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public file : File,
              public media : Media,
              public mediaCapture : MediaCapture,
              public sql :MissionDbSqlLitProvider,
              ) {
                this.continue = this.navParams.data.flage;
                console.log(this.continue);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionsPage');

// return original
    this.sql.getAllMissions().then(data=> {
      this.missions = data ;
      console.log("missions of ",this.missions)
    });
    
  }


  // ------------- Doing media logic ---------------//
  doFunction(num){
    if(num == 1){ // video recording 
      console.log("video");
      if(this.missioninfo  == 'Select' || this.missioninfo ==''){
        alert("please select a mission");
        return;
      }
        this.captureImageVideo(num);
    } 
    else if(num == 2){ // camera
        console.log("camera");
        if(this.missioninfo  == 'Select' || this.missioninfo ==''){
          alert("please select a mission");
          return;
        }
        this.captureImageVideo(num);
    }
    else if (num == 3){ // record
        console.log("record");
        if(this.missioninfo  == 'Select' || this.missioninfo ==''){
          alert("please select a mission");
          return;
        }

        if(!this.recording)
          this.startRecord();
        else 
          this.stopRecord();
    } 
    else if ( num == 4){ // call number 
      console.log("call number");
      if(this.missioninfo  == 'Select' || this.missioninfo ==''){
        alert("please select a mission");
        return;
      }
      this.navCtrl.push('CallNumberPage');
    } 
    else if (num == 5 ){ // send a message 
      console.log("send a message");
      if(this.missioninfo  == 'Select' || this.missioninfo ==''){
        alert("please select a mission");
        return;
      }
    } 
    else{ // share on social media 
      console.log("share on social media");
    }
  }

  stopRecord() {
    this.audio.stopRecord();
    this.recording = false;
  }

//------------------------------------ recording an audio ----------------------------- // 
startRecord(){ // for android only
  this.fileName = this.missions[this.missioninfo].name +new Date().getDate()+
  new Date().getMonth()+new Date().getFullYear()+
  new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';


  // -------------------- App root ------------------ //

  let appPath =this.file.createDir(this.file.externalRootDirectory,'RevealCrime', true);

  appPath.then(EntryUrl=>{
    EntryUrl.getDirectory('Myrecords',{create : true},dir2=>{
      dir2.getDirectory(this.missions[this.missioninfo].name,{create:true},dir3=>{
        
        this.filePath =  dir3.toURL() + this.fileName; //-------------------------> path to record with filename

        let date = new Date();
        let mydate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
        mydate = moment(mydate).format('MMMM Do YYYY, h:mm:ss a'); // format the time

        // ----- insert an audio into db first getting mission id then insert
          this.sql.InsertArecord(this.missions[this.missioninfo].id,this.fileName,dir3.toURL(), mydate).catch(err=>{
            console.log(err.message);
          });

          this.audio = this.media.create(this.filePath); // path + fileName
          this.audio.startRecord();
          this.recording = true;
      });
    });
  });
}

  // ------------------------------- capture images && video---------------------- //
  captureImageVideo(num){
    // if video capture it else capture an image
    let chocie = num == 1 ? this.mediaCapture.captureVideo() : this.mediaCapture.captureImage();
    
    chocie.then((res : MediaFile [])=>{

      let capturedVideoImage = res[0];
      //-------------------------- App root ------------------------------//
      let appPath = this.file.createDir(this.file.externalRootDirectory , 'RevealCrime',true);

      appPath.then(EntryUrl=>{
        let path = num == 1 ? 'Myvideos' : 'Myphotos';
        EntryUrl.getDirectory(path,{create : true},dir2=>{
          console.log("name*******************",this.missions[this.missioninfo].name)
          dir2.getDirectory(this.missions[this.missioninfo].name , {create : true},dir3=>{


            let fullPath =  dir3.toURL(); // full path till folder of mission

            // --------------- processing video && Image full path url ------------//
            let fullPathO = capturedVideoImage['localURL'].split('/');
            fullPathO.pop(); // remove video name

            let fromDirectory = fullPathO.join('/');
            let fileName = capturedVideoImage.name; // file name

            // --------------- insert video or image -----------//
            if(num == 1){
              let date = new Date();
              let mydate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
              mydate = moment(mydate).format('MMMM Do YYYY, h:mm:ss a');
                this.sql.InsertAvideo(this.missions[this.missioninfo].id,fileName,fullPath,mydate);
            }
            else{
              let date = new Date();
              let mydate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
              mydate = moment(mydate).format('MMMM Do YYYY, h:mm:ss a');
                this.sql.InsertAphoto(this.missions[this.missioninfo].id,fileName,fullPath,date);
            }
            //--------------- moving a file to new path ------------------ //
            this.file.moveFile(fromDirectory ,fileName ,fullPath , fileName ).then(()=>{
            });

          });
        });
      });
    });
  }










  continue_mission(mission , i){
    let obj = {
      name : mission.name,
      desc : mission.description
    }
    this.navCtrl.push('ModesPage',obj);
  }

  // -------------SqlLite TODO -----------------//


// -------------- reading a file ------------------------//
/*     readAfile(mission : FileEntry ) : any  {

      mission.file((file)=>{
        var reader = new FileReader();
        reader.onloadend = function(){

          console.log("Successful file read: " + this.result);
          return this.result; // return text result of file
        };
        reader.readAsText(file);
      },err=>{
        console.log("error reading your file")
      });
    } */


  
}
