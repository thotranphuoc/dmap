import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';
import { LocalService } from '../../services/local.service';

@IonicPage()
@Component({
  selector: 'page-location-question',
  templateUrl: 'location-question.html',
})
export class LocationQuestionPage {
  QUESTIONS: any[] = [];
  SHOWN_QUESTION;
  RESULT = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService
  ) {
    this.QUESTIONS = this.navParams.data.QUESTIONS;
    this.SHOWN_QUESTION = this.QUESTIONS[0];
    this.SHOWN_QUESTION['imgdata'] = 'data:image/png;base64,' + this.SHOWN_QUESTION.image_description;
    // this.RESULT = this.RESULT.concat(this.SHOWN_QUESTION.id + '-');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationQuestionPage');
  }

  nextQuest(YN, No) {
    // console.log( YN, No);
    console.log(this.SHOWN_QUESTION.id, YN)
    let str = this.SHOWN_QUESTION.id + '-' + YN + ';';
    this.RESULT += str;
    if (No != '0' && No !='19') {
      // this.RESULT = this.RESULT.concat(No+'-'+YN+';')
      this.SHOWN_QUESTION = this.QUESTIONS.filter(Q => Q.id == No)[0];
      this.SHOWN_QUESTION['imgdata'] = 'data:image/png;base64,' + this.SHOWN_QUESTION.image_description;
    } else {
      // this.RESULT = this.RESULT.concat(YN+';')
      console.log('done');
      this.localService.STRING += this.RESULT;
      this.navCtrl.pop();
    }
    console.log(this.RESULT);
  }

}
