import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LocationSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-setting',
  templateUrl: 'location-setting.html',
})
export class LocationSettingPage {
  LOCATIONS = [
    {name: 'Benh vien', iconURL: '', isShown: false },
    {name: 'Benh vien', iconURL: '', isShown: false },
    {name: 'Benh vien', iconURL: '', isShown: false },
    {name: 'Benh vien', iconURL: '', isShown: false },
    {name: 'Benh vien', iconURL: '', isShown: false },
    {name: 'Benh vien', iconURL: '', isShown: false },
    {name: 'Benh vien', iconURL: '', isShown: false },
    {name: 'Benh vien', iconURL: '', isShown: false },
    {name: 'Benh vien', iconURL: '', isShown: false },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationSettingPage');
  }

}
