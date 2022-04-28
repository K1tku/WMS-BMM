import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'



@Component({
  selector: 'bmm-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  constructor(private router:Router) { }

  goToMainPage(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }

  ngOnInit(): void {

  }

}
