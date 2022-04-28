import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'bmm-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  toppings: FormGroup;


  constructor(private _bottomSheetRef: MatBottomSheetRef<AddUserComponent>,fb: FormBuilder) {
    this.toppings = fb.group({
      account_is_dislable: false,
      must_change_password: false,
    });
  }

  name_value = 'User Name';
  lastname_value = 'User Last Name';

  ngOnInit(): void {
  }

}
