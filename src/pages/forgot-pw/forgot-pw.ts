import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { DbService } from '../../services/db.service';
import { LoadingService } from '../../services/loading.service';

/**
 * Generated class for the ForgotPwPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-pw',
  templateUrl: 'forgot-pw.html',
})
export class ForgotPwPage {
  email = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appService: AppService,
    private dbService: DbService,
    private loadingService: LoadingService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPwPage');
  }
  recoverPw(){
    this.loadingService.startLoading();
    // alert('this function is under dev')
    console.log(this.email);
    if(this.checkifAvailable(this.email)){
      this.dbService.passwordForgetEmailSend(this.email)
      .then((res:any)=>{
        if(res.result == '1'){
          this.appService.presentToast('Success. Please check inbox',5000);
          this.navCtrl.setRoot('MapPage');
          this.loadingService.hideLoading();
        }
      })
      .catch((err)=>{
        console.log(err);
        this.loadingService.hideLoading();
      })
    }
    
  }

  checkifAvailable(email){
    if(email.trim().length<1){

      this.appService.showToastWithCloseButton('email cannot be empty')
      return false;
    }
    return true;
  }

}
