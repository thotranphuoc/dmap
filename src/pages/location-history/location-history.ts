import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { iLocation } from '../../interfaces/location.interface';
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


  /*setLocations(){
    console.log(this.LOCATION)
    this.doSend2Admin(0);
  }

  doSend2Admin(active: any) {
    console.log(this.LOCATION);
    console.log(this.TYPES, this.localService.STRING);
    if(this.localService.USER){
      this.dbService.locationNewAdd(this.LOCATION.Latitude,this.LOCATION.Longitude,this.LOCATION.Title,this.LOCATION.Address,this.LOCATION.Phone, this.LOCATION.User_Phone, this.LOCATION.LocationType_Ref,this.TYPES,this.localService.STRING , active)
      .then((res)=>{
        console.log(res);
        this.appService.presentToast('Thành công', 5000)
        this.navCtrl.setRoot('MapPage');
      })
      .catch(err => {
        console.log(err);
      })
    }else{
      this.go2Login();
    }

  }*/
}
