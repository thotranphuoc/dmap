import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbService } from '../../services/db.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbService: DbService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user,pass){
    // let user = 'luan@gmail.com';
    // let pass = '12345678';
    this.dbService.userLogin(user, pass)
    .then((res)=>{
      console.log(res);
    })
    .catch(err=>{ 
      console.log(err);
    })
  }

  go2Register(){
    this.navCtrl.push('RegisterPage');
  }

  go2ForgotPass(){
    this.navCtrl.push('ForgotPwPage');
  }

}