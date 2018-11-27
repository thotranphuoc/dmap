import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbService } from '../../services/db.service';
import { LocalService } from '../../services/local.service';
import { iUser } from '../../interfaces/user.interface';

/**
 * Generated class for the CommentAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment-add',
  templateUrl: 'comment-add.html',
})
export class CommentAddPage {
  ID;
  USER: iUser;
  COMMENTS = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dbService: DbService,
    private localService: LocalService
    ) {
      this.ID = this.navParams.get('LocationID');
      this.USER = this.localService.USER;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentAddPage');
    this.getComments();
  }

  getComments(){
    let ID = this.ID
    this.COMMENTS = [];
    this.dbService.commentsGet(ID)
    .then((res: any)=>{
      console.log(res);
      this.COMMENTS = res;
    })
  }

  addComment(comment){
    console.log(comment);
    let d = new Date();
    this.dbService.commentAdd(this.USER.FullName, this.ID, d.toString(), comment)
    .then((res: any)=>{
      console.log(res);
      this.getComments();
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}
