import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbService } from '../../services/db.service';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  data;
  ID: any;
  LOCATION: any = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbService: DbService
    ) {
      
      this.data = navParams.data;
      console.log(this.data);
      this.ID = this.data.LOCATION.LocationID;
      console.log(this.ID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.getLocation(this.ID);
  }

  getLocation(ID: string){
    this.dbService.getLocation(ID)
    .then((res: any[])=>{
      console.log(res);
      this.LOCATION = res[0];
    })
    .catch(err=>{
      console.log(err);
    })
  }

  go2CommentAdd(){
    this.navCtrl.push('CommentAddPage', {LocationID: this.ID});
  }

  go2MapRoute(){
    this.navCtrl.push('MapRoutePage', {LOCATION: this.LOCATION});
  }
  
}
