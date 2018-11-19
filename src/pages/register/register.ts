import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbService } from '../../services/db.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  fullname = '';
  matkhau = '';
  diachi = '';
  email = '';
  sodt = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbService: DbService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.dbService.userNewRegister(this.fullname,this.matkhau, this.diachi, this.email, this.sodt)
    .catch(err=>{
      console.log(err);
    })
    .then((res)=>{
      console.log(res);
    })
  }

}
