import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()


export class DbService {
    loading: any;
    count: number = 0;
    isLoading: boolean = false;
    constructor(
        private loadingCtrl: LoadingController,
        private httpClient: HttpClient
    ) { }

   
    getLocations(){
        return this.httpClient.get('http://www.drdvietnam.org/bandotiepcan/service?action=getAllLocation').toPromise()
        // .subscribe((res)=>{
        //     console.log(res);
        // })
    }

    getLocation(ID: string){
        let url = 'http://www.drdvietnam.org/bandotiepcan/service?action=getLocation&LocationID='+ID;
        console.log(url);
        return this.httpClient.get(url).toPromise();
    }

    getAllQuestionTypes(){
        let url = 'http://www.drdvietnam.org/bandotiepcan/service?action=getAllQuestionType'
        return this.httpClient.get(url).toPromise();
    }

    getAllLocationTypes(){
        let url = 'http://www.drdvietnam.org/bandotiepcan/service?action=getAllLocationType'
        return this.httpClient.get(url).toPromise();
    }

    userNewRegister(fullname, matkhau, diachi, email, sodt){
        let url = "http://www.drdvietnam.org/bandotiepcan/service?action=insert&fullname=" + fullname + "&password=" + matkhau +"&address="+diachi+"&email="+email+"&telephone="+sodt;
        return this.httpClient.get(url).toPromise();
    }

    locationNewAdd(Latitude,Longitude,Address,Phone,User_Phone,LocationType_Ref){
        let url = 'http://www.drdvietnam.org/bandotiepcan/service?action=insertLocation&Latitude='+Latitude+'&Longitude='+Longitude+'&Address='+Address+'&Phone='+Phone+'&User_Phone='+User_Phone+'&LocationType_Ref='+LocationType_Ref;
        return this.httpClient.get(url).toPromise();
    }

    
}