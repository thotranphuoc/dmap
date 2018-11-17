import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingService } from '../../services/loading.service';
import { iPosition } from '../../interfaces/position.interface';
import { GmapService } from '../../services/gmap.service';
import { DbService } from '../../services/db.service';

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
  USER_LOCATION: iPosition = { lat: 10, lng: 10 };
  MAP_ZOOM: number = 5;
  MAKERS_LOADED: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingService: LoadingService,
    private gmapService: GmapService,
    private dbService: DbService
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
      this.gmapService.getCurrentLocation().then((position: iPosition) => {
        console.log(position);
        this.USER_LOCATION = position;
        this.showMap(this.USER_LOCATION, mapElement);
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
          // this.loadShops();
        })
      })
  }

  getLocations() {
    this.dbService.getLocations()
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }

}
