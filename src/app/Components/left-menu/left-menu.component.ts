import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bmm-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  logoIcon:string = "../../Images/icons/Logo.jpg";

}
