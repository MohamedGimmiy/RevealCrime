import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MissionDbSqlLitProvider } from '../../providers/mission-db-sql-lit/mission-db-sql-lit';
import { VideoPlayer,VideoOptions } from '@ionic-native/video-player';
import { Media } from '@ionic-native/media';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/* import { FileOpener } from '@ionic-native/file-opener';
 */


@IonicPage()
@Component({
  selector: 'page-view-media',
  templateUrl: 'view-media.html',
})
export class ViewMediaPage {
 @ViewChild('vid') myvido ;

  allMedia : any; // name and url
  mediaArray : any;
  videosrc : any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sql : MissionDbSqlLitProvider,
              public videoplayer : VideoPlayer,
              public media : Media,
              public photo : PhotoViewer) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMediaPage');
    this.allMedia = this.navParams.data; // getting mission params

    console.log(this.navParams.data , "view media params********");
    //-------------- getting media  related to mission ------------------//
    console.log(this.allMedia.type,  "   " , this.allMedia)

    if(this.allMedia.type == "videos"){
      this.sql.getvideos(this.allMedia.mid).then(data=>{
        this.mediaArray = data;
        console.log(data,"media ***********");

        //---------- video logic ------------- //
/*          this.videosrc = this.mediaArray[0].url + this.mediaArray[0].name;
        console.log(this.videosrc);
        let video = this.myvido.nativeElement;
        console.log(video,"native element");
        video.src = this.videosrc;  */
/*         this.mVideoPlayer = this.mVideoPlayer.nativeElement;
        this.videosrc = this.videosrc.replace('file://',''); */

        // return origianl
      }).catch(err=>{
        console.log(err.message);
      });


    }


// return original
    if(this.allMedia.type == "records"){
      this.sql.getrecords(this.allMedia.mid).then(data=>{
        console.log("records ", data)
        this.mediaArray = data;
      }).catch(err=>{
        console.log(err.message);
      });
    }



// return original
    if(this.allMedia.type == "pictures")
    this.sql.getphotos(this.allMedia.mid).then(data=>{
      this.mediaArray = data;
    }).catch(err=>{
      console.log(err.message);
    });

  }
  displayMedia(media , i){
    
    //-----------------------TODO------------------------ //
    if(this.allMedia.type == "records"){

      this.playRecord(media,i);

    } else if(this.allMedia.type == "videos"){

      this.playVideo(media,i);

    } else { // pictures
      
      this.viewAnImage(media, i);

    }




  }

  // -------------- video playing & stoping functions -------------- //
  playVideo(media , i){
    let videoPath = media.url.replace('file://','') + media.name;


/*     this.fileopener.open(videoPath, 'video/mp4')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e)); */


    this.videoplayer.play(videoPath).then(() => {
    console.log('video completed');
    }).catch(err => {
    console.log(err);
    });
  }

  stopVideo(media , i){
    let videoPath = media.url + media.name;
    this.videoplayer.close();
  }

  // ------------- records playing & stopping functions ----------- //
  playRecord(media , i){

    let audioPath = media.url + media.name;
    let audio = this.media.create(audioPath);
    audio.play();
    audio.setVolume(0.8); // 80%
  }

  stopRecord(media , i){
        let audioPath = media.url + media.name;
    let audio = this.media.create(audioPath);
    audio.stop(); // stop playing record
  }

  // --------------------- image viewing --------------------//
  viewAnImage(media , i){
    let ImagePath = media.url + media.name;
    this.photo.show(ImagePath , 'Images', {share : true});
  }
  // -------------------- returning -----------------------//
  returning(){
    this.navCtrl.pop();
  }

}
