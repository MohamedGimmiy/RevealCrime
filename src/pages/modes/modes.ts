import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';

import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-modes',
  templateUrl: 'modes.html',
})
export class ModesPage {

  fileName : any;
  filePath : any;
  audio : MediaObject;
  recording : any;
  audioList : [any];

  mission_name : any;
  mission_id : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public file : File,
              public media : Media,
              public mediaCapture : MediaCapture,
              public sql : MissionDbSqlLitProvider) {
                this.mission_name = this.navParams.data;
                // return this code again
                this.sql.getSpecificMission(this.mission_name.name)
                .then(data=>{
                  console.log("mission id***********",data);
                  this.mission_id = data.id;
                });  
  }





  ionViewDidLoad() {
  }

  // ------------- Doing media logic ---------------//
  doFunction(num){
    if(num == 1){ // video recording 
      console.log("video");
        this.captureImageVideo(num);
    } 
    else if(num == 2){ // camera
        console.log("camera");
        this.captureImageVideo(num);
    }
    else if (num == 3){ // record
        console.log("record");
        if(!this.recording)
          this.startRecord();
        else 
          this.stopRecord();
    } 
    else if ( num == 4){ // call number 
      console.log("call number");
      this.navCtrl.push('CallNumberPage');
    } 
    else if (num == 5 ){ // send a message 
      console.log("send a message");
    } 
    else{ // share on social media 
      console.log("share on social media");
    }
  }

//------------------------------------ recording an audio ----------------------------- // 
  startRecord(){ // for android only
    this.fileName = this.mission_name.name +new Date().getDate()+
    new Date().getMonth()+new Date().getFullYear()+
    new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';


    // -------------------- App root ------------------ //

    let appPath =this.file.createDir(this.file.externalRootDirectory,'RevealCrime', true);

    appPath.then(EntryUrl=>{
      EntryUrl.getDirectory('Myrecords',{create : true},dir2=>{
        dir2.getDirectory(this.mission_name.name,{create:true},dir3=>{
          
          this.filePath =  dir3.toURL() + this.fileName; //-------------------------> path to record with filename

          let date = new Date();
          let mydate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
          mydate = moment(mydate).format('MMMM Do YYYY, h:mm:ss a'); // format the time
          // ----- insert an audio into db
          this.sql.InsertArecord(this.mission_id,this.fileName,dir3.toURL(), mydate).catch(err=>{
            console.log(err.message);
          });

          console.log('file path', this.filePath)
          this.audio = this.media.create(this.filePath); // path + fileName
          this.audio.startRecord();
          this.recording = true;
        });
      });
    });
  }
  // ------------------------------------- stop recording ----------------------//
  stopRecord() {
    this.audio.stopRecord();
    this.recording = false;
  }
  
  // ------------------------------- capture video---------------------- //
  // TODO capture image does not work properly
  captureImageVideo(num){
    // if video capture it else capture an image
    let chocie = num ==1 ?this.mediaCapture.captureVideo() : this.mediaCapture.captureImage() ;
    console.log("capturing........")
    chocie.then((res : MediaFile [])=>{
      console.log("capturing 2...........");
      let capturedVideoImage = res[0];

      //-------------------------- App root ------------------------------//
      let appPath = this.file.createDir(this.file.externalRootDirectory , 'RevealCrime',true);

      appPath.then(EntryUrl=>{
        let path = num == 1 ? 'Myvideos' : 'Myphotos';
        EntryUrl.getDirectory(path,{create : true},dir2=>{

          dir2.getDirectory(this.mission_name.name , {create : true},dir3=>{


            let fullPath =  dir3.toURL(); // full path till folder of mission

            // --------------- processing video && Image full path url ------------//
            let fullPathO = capturedVideoImage['localURL'].split('/');
            fullPathO.pop(); // remove video name

            let fromDirectory = fullPathO.join('/');
            let fileName = capturedVideoImage.name; // file name

            // --------------- insert video -----------//
            if(num ==1){
              let date = new Date();
              let mydate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
              mydate = moment(mydate).format('MMMM Do YYYY, h:mm:ss a');
              this.sql.InsertAvideo(this.mission_id,fileName,fullPath,mydate);
            }
             else{
              console.log("Insert a Photo");
               let date = new Date();
              let mydate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
              mydate = moment(mydate).format('MMMM Do YYYY, h:mm:ss a');
              this.sql.InsertAphoto(this.mission_id,fileName,fullPath,mydate); 
            } 

            //--------------- moving a file to new path ------------------ //
            // this line , it will be removed in other devices
            this.file.moveFile(fromDirectory ,fileName ,fullPath , fileName ).then(()=>{
              console.log("moved successfully");
            }).catch(err=>{
              console.log("error coulding move file   ",err)
            })

          });
        });
      });
    });
  }

}
