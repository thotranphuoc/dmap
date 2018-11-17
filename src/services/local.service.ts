import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { iPosition } from '../interfaces/position.interface';


@Injectable()


export class LocalService {
    loading: any;
    count: number = 0;
    isLoading: boolean = false;
    constructor(
        private loadingCtrl: LoadingController
    ) { }

    USER_CURRENT_LOCATION: iPosition = null;
}