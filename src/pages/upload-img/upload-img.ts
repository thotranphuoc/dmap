import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { DbService } from '../../services/db.service';
import { AppService } from '../../services/app.service';
/**
 * Generated class for the UploadImgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-img',
  templateUrl: 'upload-img.html',
})
export class UploadImgPage {
  //USER: iUser;
  base64Images: string[] = [];
  hasNewAvatar: boolean = false;
  constructor(
    private navCtrl: NavController,
   // private crudService: CrudService,
    //private setGetService: SetgetService,
    private appService: AppService,
    private modalCtrl: ModalController,
    private dbService: DbService
  ) { }

  ngOnInit() {
  }

  

 
}
