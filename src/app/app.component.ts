import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'LoginPage';
  pages: Array<{ title: string, component: string, icon: string }>  = [
    { title: 'Map', component: 'MapPage', icon: 'map' },
  ];
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    // this.initializeApp();
    
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

