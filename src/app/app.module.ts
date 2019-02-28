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
import {AgmCoreModule} from '@agm/core';

// import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { MapAutocompletePage } from '../pages/map-autocomplete/map-autocomplete';
import {PrettyJsonModule} from 'angular2-prettyjson';
import { MapAutocompletePageModule } from '../pages/map-autocomplete/map-autocomplete.module';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { MapPage } from '../pages/map/map';
import { AutoCompleteModalPage } from '../pages/auto-complete-modal/auto-complete-modal';
//import {Keyboard} from '@ionic-native/keyboard';
@NgModule({
  declarations: [
    MyApp,
    //MapAutocompletePage
    // HomePage
    //MapPage
    AutoCompleteModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey   : 'AIzaSyCjBaIhoK9XX4eOfeSsPb91bq14DO_gJUc',
      libraries: ['places']
    }),
    PrettyJsonModule,
    MapAutocompletePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AutoCompleteModalPage
    //MapAutocompletePage
    // HomePage
    //MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
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
