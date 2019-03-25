import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { text } from '@angular/core/src/render3/instructions';
import { MissionDbSqlLitProvider } from '../providers/mission-db-sql-lit/mission-db-sql-lit';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomeTwoPage';

  pages: Array<{title: string, component: string , icons : string}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private alertCtr : AlertController,
              public Missionsql : MissionDbSqlLitProvider,
              public events : Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomeTwoPage' , icons : 'home' },
      { title: 'Missions', component: 'MissionsPage' , icons : 'albums' },
      { title: 'Videos', component: 'VideosPage' , icons:'videocam' },
      { title: 'pictures', component: 'PicturesPage' , icons : 'images' },
      { title: 'Records', component: 'RecordsPage' , icons : 'microphone' },
      {title : 'PhoneNumbers', component : 'PhonesPage' , icons : 'contacts'},
/*       { title: 'Settings', component: 'SettingsPage' },
 */        ];
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // ------------- initialize database --------------------- //
      // return back
      this.Missionsql.initializeDataBase().then(()=>{
        this.events.publish('initOfDatabase');

        this.rootPage = 'HomeTwoPage';
        console.log("Init");
      });
    });




  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  //------------------ close ionic application -------------------- //
  close(){
    let alert =this.alertCtr.create({
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
