import { Injectable } from '@angular/core';
import { LoadingController, Loading, PopoverController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { LocalService } from './local.service';
import { iPosition } from '../interfaces/position.interface';
import { iLocation } from '../interfaces/location.interface';

declare var google: any;
@Injectable()


export class GmapService {
    loading: any;
    count: number = 0;
    isLoading: boolean = false;
    currentUserPosition: iPosition = null;
    bluecirle: string = '../assets/imgs/bluecircle.png';
    constructor(
        private popoverCtrl: PopoverController,
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
                        console.log({MSG: 'navigator.geolocation not available'})
                        resolve({lat: 10.780482, lng: 106.70223})
                    })
                } else {
                    console.log('navigator not allowed')
                    resolve({lat: 10.780482, lng: 106.70223})
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

    addMarkerWithImageToMapWithIDReturnPromiseWithMarker(map, position: iPosition, LOCATION: iLocation) {
        return new Promise((resolve, reject) => {
            let pos = new google.maps.LatLng(position.lat, position.lng);
            let image = {
                url: LOCATION.Url_Image,
                // This marker is 20 pixels wide by 32 pixels high.
                // size: new google.maps.Size(75, 56),
                // The origin for this image is (0, 0).
                // origin: new google.maps.Point(37, 28),
                // The anchor for this image is the base of the flagpole at (0, 32).
                // anchor: new google.maps.Point(0, 26),
                scaledSize: new google.maps.Size(45, 53),
            };
            let marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: image
            })

            marker.addListener('click', () => {
                console.log(LOCATION);
                // let popover = this.popoverCtrl.create('PopOverPage', LOCATION).present();
                
                this.popoverCtrl.create('PopOverPage', { LOCATION: LOCATION }).present()
                    .then((res) => { console.log(res); })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        })
    }
}