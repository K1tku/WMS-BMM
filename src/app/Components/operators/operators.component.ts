import { Component, OnInit, NgModule } from '@angular/core';
import {UserService} from "../shared/user.service";
import {users} from "../shared/user.service";



@Component({
  selector: 'bmm-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {



  constructor(private userService : UserService) {

  }

  ngOnInit(): void {

  }


}

