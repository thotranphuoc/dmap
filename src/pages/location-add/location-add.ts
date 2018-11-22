import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { iLocation } from '../../interfaces/location.interface';
import { LocalService } from '../../services/local.service';
import { DbService } from '../../services/db.service';

/**
 * Generated class for the LocationAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-add',
  templateUrl: 'location-add.html',
})
export class LocationAddPage {
  LOCATION: iLocation;
  QUESTIONTYPES: any[] = [];
  QUESTIONS: any[] = [];
  LOCATIONTYPES: any[] = [];
  TYPES = '';
  LOC: iLOC = {
    TempID: '',
    Latitude: '',
    Longitude: '',
    Title: '',
    Address: '',
    Phone: '',
    User_Phone: '',
    LocationType_Ref: 0
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private localService: LocalService,
    private dbService: DbService,
    
  ) {
    this.LOCATION = this.localService.LOCATION_DEFAULT
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationAddPage');
    this.getQuestionTypes();
    this.getLocationTypes();
  }

  getQuestionTypes() {
    this.dbService.getAllQuestionTypes()
      .then((res: any[]) => {
        console.log(res);
        this.QUESTIONTYPES = res;
      })
      .catch(err => {
        console.log(err);
      })
  }

  selectQuestionType(qt){
    console.log(qt);
    this.getQuestionsOfType(qt.id);
  }

  getQuestionsOfType(ID){
    console.log(ID);
    let index = this.QUESTIONTYPES.map(q=> q.id).indexOf(ID);
    console.log(index);
    this.QUESTIONTYPES.splice(index,1);
    this.dbService.getAllQuestionsOfType(ID)
    .then((res: any[]) => {
      console.log(res);
      this.QUESTIONS = res;
      this.TYPES +=ID + ';'
      this.navCtrl.push('LocationQuestionPage',{QUESTIONS: res});
    })
    .catch(err => {
      console.log(err);
    })
  }

  getLocationTypes() {
    this.dbService.getAllLocationTypes()
      .then((res: any[]) => {
        console.log(res);
        this.LOCATIONTYPES = res;
      })
      .catch(err => {
        console.log(err);
      })
  }

  

  send2Admin() {
    console.log(this.LOC);
    console.log(this.TYPES, this.localService.STRING);
    if(this.localService.USER){
      this.dbService.locationNewAdd(this.LOC.Latitude,this.LOC.Longitude,this.LOC.Title,this.LOC.Address,this.LOC.Phone, this.LOC.User_Phone, this.LOC.LocationType_Ref,this.TYPES,this.localService.STRING )
      .then((res) => {
        console.log(res);
        this.navCtrl.setRoot('MapPage');
      })
      .catch(err => {
        console.log(err);
      })
    }else{
      this.go2Login();
    }

  }

  updateLocation() {
    let CURRENT_LOCATION = this.localService.USER_CURRENT_LOCATION;
    let mapModal = this.modalCtrl.create('LocationSetPage', { CURRENT_LOCATION: CURRENT_LOCATION });
    mapModal.onDidDismiss((data: any) => {
      console.log(data);
      // if (data) {
      //   this.SHOP.SHOP_LOCATION = data.NEW_LOCATION;
      // }
      if (data.NEW_LOCATION) {
        this.LOC.Latitude = data.NEW_LOCATION.lat;
        this.LOC.Longitude = data.NEW_LOCATION.lng;
      }
    })
    mapModal.present();
  }

  selectLocation(loc) {
    console.log(loc);
    this.LOC.LocationType_Ref = loc.LocationTypeID;
  }

  go2Login(){
    this.navCtrl.push('LoginPage',{isBack: true});
  }

}

export interface iLOC {
  TempID: string,
  Latitude: string,
  Longitude: string,
  Title: string,
  Address: string,
  Phone: string,
  User_Phone: string,
  LocationType_Ref: number, // Location ID
}
