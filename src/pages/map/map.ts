import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { LoadingService } from '../../services/loading.service';
import { iPosition } from '../../interfaces/position.interface';
import { GmapService } from '../../services/gmap.service';
import { DbService } from '../../services/db.service';
import { iLocation } from '../../interfaces/location.interface';
import { LocalService } from '../../services/local.service';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  data: any;
  mapEl: any;
  map: any;
  // USER_LOCATION: iPosition = { lat: 10.37211, lng: 106.453621 };
  USER_LOCATION: iPosition = null;
  MAP_ZOOM: number = 10;
  MAKERS_LOADED: boolean = false;
  LOCATIONS = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private loadingService: LoadingService,
    private gmapService: GmapService,
    private dbService: DbService,
    private localService: LocalService
  ) {
    this.getLocations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.startInitMap();
    this.getLocations();
  }

  startInitMap() {
    this.loadingService.startLoading();
    setTimeout(() => {
      this.mapEl = document.getElementById('map');
      this.initMap(this.mapEl)
    }, 1000)
  }

  initMap(mapElement) {
    if (this.USER_LOCATION) {
      this.showMap(this.USER_LOCATION, mapElement);
    } else {
      this.gmapService.getCurrentLocation()
        .then((position: iPosition) => {
          console.log(position);
          this.USER_LOCATION = position;
          this.showMap(this.USER_LOCATION, mapElement);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  showMap(position: iPosition, mapElement) {
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    let mapOptions = {
      center: latLng,
      zoom: this.MAP_ZOOM,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      fullscreenControl: false
    }

    console.log(mapElement, mapOptions);
    this.gmapService.initMap(mapElement, mapOptions)
      .then((map) => {
        console.log(map);
        this.map = map;
        // when maps is loaded and become idle
        this.gmapService.addBlueDotToMap(this.map, mapOptions.center);
        google.maps.event.addListener(this.map, 'idle', () => {
          console.log('map was loaded fully');
          this.loadingService.hideLoading();
          if (this.LOCATIONS.length > 0) {
            this.loadLocation2Map(this.LOCATIONS);
          } else {
            this.getLocations().then(() => {
              this.loadLocation2Map(this.LOCATIONS);
            })
          }
        })
      })
  }

  getLocations() {
    return new Promise((resolve, reject) => {
      this.dbService.getLocations()
        .then((res: any) => {
          console.log(res);
          this.LOCATIONS = res;
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
    })
  }

  loadLocation2Map(LOCATIONS: iLocation[]) {
    console.log(LOCATIONS);
    if (LOCATIONS.length > 0) {
      if (!this.MAKERS_LOADED) {
        this.MAKERS_LOADED = true;
        // LOCATIONS.map(LOCATION =>{
        //   let img0: string = LOCATION.SHOP_IMAGE_URL.toString();
        //   let img1: string = img0.replace('_0?alt=media&token=', '_1?alt=media&token=');
        //   LOCATION['SHOP_IMAGES'] = [img0,img1];
        // });
        LOCATIONS.forEach(LOCATION => {
          let POS: iPosition = { lat: Number(LOCATION.Latitude), lng: Number(LOCATION.Longitude) };
          this.gmapService.addMarkerWithImageToMapWithIDReturnPromiseWithMarker(this.map, POS, LOCATION);
        })
      } else {
        console.log('markers loaded');
      }

    } else {
      console.log('this.localService.SHOPs_LOCATION = 0');
    }
  }

  go2AddLoc() {
    if (this.localService.USER) {
      this.navCtrl.push('LocationAddPage');
    } else {
      this.showConfirm();
    }

  }


  showConfirm() {
    const confirm = this.alertCtrl.create({
      // title: 'Use this lightsaber?',
      message: 'Please login before continuing',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.push('LoginPage',{isBack: true});
          }
        }
      ]
    });
    confirm.present();
  }


  checkIfUserSigned() {
    this.localService.USER
    return
  }

  showInfo() {
    console.log('show info')
    if (this.localService.USER) {
      this.presentActionSheet();
    } else {
      this.showConfirm();
    }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Xin chào: ' + this.localService.USER.FullName,
      buttons: [
        {
          text: 'Thông tin cá nhân',
          handler: () => {
            console.log('Thông tin cá nhân');
            this.navCtrl.push('ProfileUpdatePage');
          }
        },
        {
          text: 'Quà tặng và giải thưởng',
          handler: () => {
            console.log('Quà tặng và giải thưởng');
            this.navCtrl.push('GiftPage');
          }
        },
        {
          text: 'Danh sách địa điểm cập nhật',
          handler: () => {
            console.log('Danh sách địa điểm cập nhật');
            
          }
        },
        {
          text: 'Hiển thị theo loại công trình',
          // role: 'destructive',
          handler: () => {
            console.log('Hiển thị theo loại công trình');
          }
        },
        
        {
          text: 'Giới thiệu',
          handler: () => {
            console.log('Giới thiệu');
            this.navCtrl.push('InformationPage');
          }
        },
        
        {
          text: 'Giúp đỡ',
          handler: () => {
            console.log('Giúp đỡ');
            this.navCtrl.push('DmapHelpPage');
          }
        },
        {
          text: 'Thoát',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}



