import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbService } from '../../services/db.service';
import { LocalService } from '../../services/local.service';

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
  data: any;
  isBack: boolean  = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbService: DbService,
    private localService: LocalService
    ) {
      this.data = this.navParams.data;
      if(typeof(this.data) !=='undefined' && this.data.isBack){
        this.isBack = true;
        console.log(this.isBack);
      }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user,pass){
    // let user = 'luan@gmail.com';
    // let pass = '12345678';
    this.dbService.userLogin(user, pass)
    .then((res: any)=>{
      console.log(res);
      if(res.result=='1'){
        this.localService.USER = res;
        if (this.isBack){
          this.navCtrl.pop()
        }else{
          this.navCtrl.setRoot('MapPage')
        }
      }else{
        alert('Sai Tên đăng nhập hoặc mật khẩu, xin vui lòng thử lại.');
      }
      
      
    })
    .catch(err=>{ 
      console.log(err);
    })
  }

  donotLogin(){
    this.navCtrl.push('MapPage');
  }
  go2Register(){
    this.navCtrl.push('RegisterPage');
  }

  go2ForgotPass(){
    this.navCtrl.push('ForgotPwPage');
  }

}
