import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  readonly rootUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  postReceipts(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/receipts/', data, {headers: headers});
  }

  getReceipts() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/receipts', {headers: headers});
  }

  putReceipts(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/receipts/' + id , data, {headers: headers});
  }

  deleteReceipts(id:number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.delete<any>(this.rootUrl + '/api/receipts/' + id , {headers: headers});
  }

  putWarehouses(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/receipts/add-warehouse-to-receipt',  data, {headers: headers});
  }

  putCustomer(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/receipts/add-customer-to-receipt',  data, {headers: headers});
  }


  // ELEMENTY -------------------------------------------

  postReceiptsElements(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/receiptElements', data, {headers: headers});
  }

  getReceiptsElements() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/receiptElements', {headers: headers});
  }

  putReceiptsElements(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/receiptElements/' + id , data, {headers: headers});
  }

  putOperation(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/receiptElements/add-operation-to-receiptElement',  data, {headers: headers});
  }

  putWarehouseElem(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/receiptElements/add-warehouse-to-receiptElement',  data, {headers: headers});
  }

  putLocalization(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/receiptElements/add-localization-to-receiptElement',  data, {headers: headers});
  }

  putArticle(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/receiptElements/add-article-to-receiptElement',  data, {headers: headers});
  }

  getArticleWeight(id:number) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/articles/' + id, {headers: headers});
  }


}
