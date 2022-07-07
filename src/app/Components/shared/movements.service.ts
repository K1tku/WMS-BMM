import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  readonly rootUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  postMovement(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/movements/', data, {headers: headers});
  }

  getMovement() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/movements/', {headers: headers});
  }

  putMovement(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movements/' + id , data, {headers: headers});
  }

  deleteMovement(id:number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.delete<any>(this.rootUrl + '/api/movements/' + id , {headers: headers});
  }

  putWarehouses(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movements/add-warehouse-to-movement',  data, {headers: headers});
  }

  putTargetWarehouses(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movements/add-targetWarehouse-to-movement',  data, {headers: headers});
  }

  putCustomer(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/releases/movements/movements/add-customer-to-movement/',  data, {headers: headers});
  }


  // ELEMENTY -------------------------------------------

  postMovementElements(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/movementElements/', data, {headers: headers});
  }

  getMovementsElements(id: number) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/movementElements/operationId/' + id, {headers: headers});
  }

  /*getMovementElements() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/movementElements', {headers: headers});
  }*/

  putMovementElements(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movementElements/' + id , data, {headers: headers});
  }

  putOperation(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movementElements/add-operation-to-movementElement',  data, {headers: headers});
  }

  putWarehouseElem(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movementElements/add-warehouse-to-movementElement',  data, {headers: headers});
  }

  putTargetWarehouseElem(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movementElements/add-targetWarehouse-to-movementElement',  data, {headers: headers});
  }

  putLocalization(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movementElements/add-localization-to-movementElement',  data, {headers: headers});
  }

  putTargetLocalization(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movementElements/add-targetLocalization-to-movementElement',  data, {headers: headers});
  }

  putArticle(data:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/movementElements/add-article-to-movementElement',  data, {headers: headers});
  }

  getArticleWeight(id:number) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/articles/' + id, {headers: headers});
  }


}
