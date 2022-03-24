import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'



@Component({
  selector: 'bmm-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

warehouses = ['WG', 'MAT', 'PROD', 'KJ']

  constructor() {}




  ngOnInit(): void {

  }


}
