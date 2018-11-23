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

    getAllQuestionsOfType(ID: string){
        let url = 'http://www.drdvietnam.org/bandotiepcan/service?action=getQuestionList&question_type='+ID;
        return this.httpClient.get(url).toPromise();
    }

    getAllLocationTypes(){
        let url = 'http://www.drdvietnam.org/bandotiepcan/service?action=getAllLocationType'
        return this.httpClient.get(url).toPromise();
    }

    locationNewAdd(Latitude,Longitude,Title,Address,Phone,User_Phone,LocationType_Ref,Qtype,QA){
       // http://www.drdvietnam.org/bandotiepcan/service?action=insertLocation&Latitude=10&Longitude=100&Title=Title&Address=Address&Phone=Phone&User_Phone=User_Phone&LocationType_Ref=1&QuestionType=1;2;3&QuestionAnswer=1-co;2-khong;3-co
        let url = 'http://www.drdvietnam.org/bandotiepcan/service?action=insertLocation&Latitude='+Latitude+'&Longitude='+Longitude+'&Title='+Title+'&Address='+Address+'&Phone='+Phone+'&User_Phone='+User_Phone+'&LocationType_Ref='+LocationType_Ref+'&QuestionType='+Qtype+'&QuestionAnswer='+QA;
        console.log(url);
        return this.httpClient.get(url).toPromise();
    }

    userLogin(user: string, pw: string){
        let url = 'http://www.drdvietnam.org/bandotiepcan/service?action=login&email='+user+'&password='+pw;
        return this.httpClient.get(url).toPromise();
    }

    userNewRegister(fullname, matkhau, diachi, email, sodt){
        let url = "http://www.drdvietnam.org/bandotiepcan/service?action=insert&fullname=" + fullname + "&password=" + matkhau +"&address="+diachi+"&email="+email+"&telephone="+sodt;
        return this.httpClient.get(url).toPromise();
    }

    passwordChange(email: string, oldPassword: string, newPassword: string){
        let url = "http://www.drdvietnam.org/bandotiepcan/service?action=changepass&email="+email+"&passwordold="+oldPassword+"&password="+newPassword;
        return this.httpClient.get(url).toPromise();
    }

    passwordForgetEmailSend(email){
        let url ="http://www.drdvietnam.org/bandotiepcan/service?action=forgotpass&email="+email;
        return this.httpClient.get(url).toPromise();
    }

    
}