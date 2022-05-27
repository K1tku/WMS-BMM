import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from "../items/item/article";

/*export interface articles {
  id: number,
  name: string,
  unit: string,
  weight: string,
  articleCode: string,
  creationDate: string,
  modificationDate: string,
  user: string
}*/


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }


  getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.rootUrl+'/api/articles'
      , {headers : new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})} );
  }

 /* addArticles(): Observable<articles[]>{
    return this.http.post<articles[]>(this.rootUrl+'/api/articles'
      , {headers : new HttpHeaders({'Authorization':'Bearer'+localStorage.getItem('userToken')})} );
  }*/

  /*addArticles( name: string,
               articleCode: string) {
    var data = '"' + "name" + '"' + ':' + ' "' + name + '",' +  '"' + "articleCode" + '"' + ':' + ' "'+ articleCode + '"' ;
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+localStorage.getItem('userToken')
    });
    return this.http.post(this.rootUrl + '/api/articles', data, { headers: reqHeader });
  }
*/
 /* addArticles(article:Article): Observable<any> {
    const headers = { 'content-type': 'application/json','Authorization':'Bearer '+localStorage.getItem('userToken')}
    const body=JSON.stringify(article);
    console.log(body)
    return this.http.post(this.rootUrl + '/api/articles', body,{'headers':headers})
  }*/

  addArticles(article: Article) {
    let body = JSON.stringify(article);
    let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('userToken') });
    return this.http.post(this.rootUrl + '/api/articles', body)
  }
}