import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Injectable()


export class AppService {
    loading: any;
    count: number = 0;
    isLoading: boolean = false;
    constructor(
        public toastCtrl: ToastController
    ) { }

    presentToast(MSG: string, timeDuration: number) {
        const toast = this.toastCtrl.create({
            message: MSG,
            duration: timeDuration
        });
        toast.present();
    }

    showToastWithCloseButton(MSG: string) {
        const toast = this.toastCtrl.create({
            message: MSG,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }
}