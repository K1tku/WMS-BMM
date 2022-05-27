import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';


@Component({
  selector: 'bmm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
  }

}
