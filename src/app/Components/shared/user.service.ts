import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import {Observable} from "rxjs";

export interface users {
  id: number,
  username: string,
  password: string,
  name: string,
  surname: string,
  roles: number,

}

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }


  userAuthentication(userName:any, password:any) {
    var data = "username=" + userName + "&password=" + password;
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(this.rootUrl + '/api/login', data, { headers: reqHeader });
  }

  /*getUsers(): Observable<users[]>{
    return this.http.get<users[]>(this.rootUrl+'/api/users'
      , {headers : new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})} );
  }*/

  getUsers() {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get<any>(this.rootUrl + '/api/users', {headers: headers});
  }

  putUsers(data:any, id : number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.put<any>(this.rootUrl + '/api/users/' + id , data, {headers: headers});
  }

  deleteUsers(id:number){
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.delete<any>(this.rootUrl + '/api/users/' + id , {headers: headers});
  }

  postUsers(data: any) {
    var headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.post<any>(this.rootUrl + '/api/users/', data, {headers: headers});
  }

}
