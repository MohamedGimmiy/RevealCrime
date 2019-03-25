import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { Media } from '@ionic-native/media';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { MissionDbSqlLitProvider } from '../providers/mission-db-sql-lit/mission-db-sql-lit';
import {SQLite} from '@ionic-native/sqlite';
import { VideoPlayer } from '@ionic-native/video-player';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/* import {FileOpener} from '@ionic-native/file-opener';
 */import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    Media,
    MediaCapture,
    SplashScreen,
    CallNumber,
    SQLite,
    File,
  //  FileOpener,
    PhotoViewer,
    VideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MissionDbSqlLitProvider,
  ]
})
export class AppModule {}
