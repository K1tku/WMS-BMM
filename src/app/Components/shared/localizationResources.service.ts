import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class localizationResourcesService {

  readonly rootUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getLocalizationResources() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/localizationResources/', {headers: headers});
  }

}
