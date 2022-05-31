import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WarehousesService {
  readonly rootUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  postWarehouses(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/warehouses/', data, {headers: headers});
  }

  getWarehouses() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/warehouses/', {headers: headers});
  }

  putWarehouses(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/warehouses/' + id , data, {headers: headers});
  }

  deleteWarehouses(id:number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.delete<any>(this.rootUrl + '/api/warehouses/' + id , {headers: headers});
  }
}
