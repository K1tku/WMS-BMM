import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from "../shared/user.service";
import {HttpErrorResponse} from "@angular/common/http";



@Component({
  selector: 'bmm-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
isLoginError : boolean = false;
  constructor(private userService : UserService,
               private router : Router) { }

  ngOnInit(){}

  OnSubmit(userName: any,password: any){
      this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken', data.accessToken);
      this.router.navigate(['/Dashboard']);
    },
        (err: HttpErrorResponse)=>{
        this.isLoginError = true;
        });

  }





}
