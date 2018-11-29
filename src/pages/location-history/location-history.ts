import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbService } from '../../services/db.service';
import { LocalService } from '../../services/local.service';

/**
 * Generated class for the LocationHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-history',
  templateUrl: 'location-history.html',
})
export class LocationHistoryPage {
  pet = 'history';
  LOCATIONS_HIS = [];
  LOCATIONS_TEMP = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbService: DbService,
    private localService: LocalService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationHistoryPage');
    this.getLocations();
    this.getTempLocations();
  }

  getLocations(){
    let email = this.localService.USER.Email;
    this.dbService.locationOfUserGet(email).then((res: any)=>{
      console.log(res);
      this.LOCATIONS_HIS = res;
    })
  }

  getTempLocations(){
    let email = this.localService.USER.Email;
    this.dbService.locationTempOfUserGet(email).then((res: any)=>{
      console.log(res);
      this.LOCATIONS_TEMP = res;
    })
  }
}
