import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  readonly rootUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  postRelease(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/releases/', data, {headers: headers});
  }

  getRelease() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/releases/', {headers: headers});
  }

  putRelease(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releases/' + id , data, {headers: headers});
  }

  deleteRelease(id:number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.delete<any>(this.rootUrl + '/api/releases/' + id , {headers: headers});
  }

  putWarehouses(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releases/add-warehouse-to-release',  data, {headers: headers});
  }

  putCustomer(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releases/add-customer-to-release',  data, {headers: headers});
  }


  // ELEMENTY -------------------------------------------

  postReleaseElements(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/releaseElements/', data, {headers: headers});
  }

  getReleaseElements(id: number) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/releaseElements/operationId/' + id, {headers: headers});
  }

  putReleaseElements(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releaseElements/' + id , data, {headers: headers});
  }

  putOperation(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releaseElements/add-operation-to-releaseElement',  data, {headers: headers});
  }

  putWarehouseElem(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releaseElements/add-warehouse-to-releaseElement',  data, {headers: headers});
  }

  putLocalization(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releaseElements/add-localization-to-releaseElement',  data, {headers: headers});
  }

  putArticle(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releaseElements/add-article-to-releaseElement',  data, {headers: headers});
  }

  getArticleWeight(id:number) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/articles/' + id, {headers: headers});
  }


}
