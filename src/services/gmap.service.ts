import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { LocalService } from './local.service';
import { iPosition } from '../interfaces/position.interface';

declare var google: any;
@Injectable()


export class GmapService {
    loading: any;
    count: number = 0;
    isLoading: boolean = false;
    currentUserPosition: iPosition = null;
    bluecirle: string = '../assets/imgs/bluecircle.png';
    constructor(
        private loadingCtrl: LoadingController,
        private localService: LocalService
    ) { }

    getCurrentLocation() {
        console.log('gmapSer.getcurrentLocation');
        console.log(navigator, navigator.geolocation);
        return new Promise((resolve, reject) => {
            if (this.localService.USER_CURRENT_LOCATION) {
                resolve(this.localService.USER_CURRENT_LOCATION)
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        console.log('Curent location', position);
                        this.currentUserPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
                        this.localService.USER_CURRENT_LOCATION = this.currentUserPosition;
                        resolve(this.currentUserPosition);
                    }, err => {
                        reject({MSG: 'navigator.geolocation not available'})
                    })
                } else {
                    reject({MSG: 'navigator.geolocation not available'})
                }
            }
        })
    }

    initMap(mapElement, mapOptions) {
        return new Promise((resolve, reject) => {
            let map: any;
            if (typeof (google) !== 'undefined') {
                map = new google.maps.Map(mapElement, mapOptions);
                resolve(map);
            } else {
                reject({ message: 'google is undefined' });
            }
        })
    }

    addBlueDotToMap(map: any, position: any) {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: this.bluecirle
        });
    }
}