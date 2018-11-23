import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbService } from '../../services/db.service';
import { LocalService } from '../../services/local.service';

/**
 * Generated class for the PasswordChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dbService: DbService,
    private localService: LocalService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordChangePage');
  }

  changePassword(old, new1, new2) {
    console.log(old, new1, new2);
    if (this.checkIfValid(old, new1, new2)) {
      let email = this.localService.USER.Email;
      // let email = 'luan@gmail.com'
      this.dbService.passwordChange(email, old, new1)
        .then((res: any) => {
          console.log(res);
          if(res.result == '1'){
            alert('Password changed successfully');
            this.navCtrl.setRoot('MapPage');
          }else{
            alert('Opps, failed');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  checkIfValid(old, new1, new2) {
    if (old.length < 1 || new1.length < 1 || new1.length < 1) {
      alert('Cannot be empty');
      return false;
    }
    if (new1 !== new2) {
      alert('Password mismatched');
      return false;
    }
    return true;
  }

}
