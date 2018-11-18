import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { iPosition } from '../interfaces/position.interface';
import { iLocation } from '../interfaces/location.interface';


@Injectable()


export class LocalService {
    loading: any;
    count: number = 0;
    isLoading: boolean = false;
    constructor(
        private loadingCtrl: LoadingController
    ) { }

    USER_CURRENT_LOCATION: iPosition = null;

    LOCATION: iLocation = {
        Address: '',
        Date_Updated: '',
        Image: '',
        IsActive: '',
        Latitude: '',
        LocationID: '',
        LocationTypeID: '',
        LocationType_Ref: '',
        Longitude: '',
        Name: '',
        Name_en: '',
        Phone: '',
        Title: '',
        Url_Image: '',
        User_Phone: '',

    };
    LOCATION_DEFAULT: iLocation = {
        Address: '',
        Date_Updated: '',
        Image: '',
        IsActive: '',
        Latitude: '',
        LocationID: '',
        LocationTypeID: '',
        LocationType_Ref: '',
        Longitude: '',
        Name: '',
        Name_en: '',
        Phone: '',
        Title: '',
        Url_Image: '',
        User_Phone: '',

    }
}