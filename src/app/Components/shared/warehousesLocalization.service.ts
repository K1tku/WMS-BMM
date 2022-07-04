import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class WarehousesLocalizationService {
  readonly rootUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

/*  postRows(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/rows/', data, {headers: headers});
  }*/

  putIdToLocalizations(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/localizations/add-warehouse-to-localization/', data, {headers: headers});
  }

  postLocalizations(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/localizations/', data, {headers: headers});
  }

  getLocalizations() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/localizations/', {headers: headers});
  }

  putLocalizations(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/localizations/' + id , data, {headers: headers});
  }

  deleteLocalizations(id:number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.delete<any>(this.rootUrl + '/api/localizations/' + id , {headers: headers});
  }

}
