import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalService } from '../../services/local.service';
import { iUser } from '../../interfaces/user.interface';
import { DbService } from '../../services/db.service';
import { AppService } from '../../services/app.service';


@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {
  USER: iUser;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private localService: LocalService,
    private dbService: DbService,
    private appService: AppService
    ) {
      this.USER = this.localService.USER;
      console.log(this.USER);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUpdatePage');
  }

  update(){
    console.log(this.USER);
    this.dbService.profileUpdate(this.USER.FullName, this.USER.Address, this.USER.Email, this.USER.Phone)
    .then((res: any)=>{
      console.log(res);
      if(res.result == '1'){
        this.appService.presentToast('Profile updated successfully', 5000);
        this.navCtrl.pop();
      }else{
        this.appService.presentToast('Error, please contact admin', 5000);
      }
    })
    .catch((err)=>{
      this.appService.presentToast(err, 5000);
    })
  }

  cancel(){
    console.log('cancel');
    this.navCtrl.pop();
  }

}
