import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//import { Storage } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { LoadingService } from '../services/loading.service';
import { GmapService } from '../services/gmap.service';
import { LocalService } from '../services/local.service';
import { DbService } from '../services/db.service';
import { AppService } from '../services/app.service';
import { ImageService } from '../services/image.service';
import { IonicStorageModule } from '@ionic/storage';

// import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
@NgModule({
  declarations: [
    MyApp,
    // HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingService,
    GmapService,
    LocalService,
    DbService,
    AppService,
    ImageService,
    Geolocation,
    //Storage
  ]
})
export class AppModule {}
