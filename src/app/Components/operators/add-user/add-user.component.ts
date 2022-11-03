import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'bmm-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  usersForm !: FormGroup;
  actionBtn: string = "Zapisz";


  constructor(private formBuilder: FormBuilder
    , private userService: UserService
    , private dialogRef: MatDialogRef<AddUserComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) {

  }


  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })


    if (this.editData) {
      this.actionBtn = "Update";
      this.usersForm.controls['name'].setValue(this.editData.name);
      this.usersForm.controls['surname'].setValue(this.editData.surname);
      this.usersForm.controls['username'].setValue(this.editData.username);
      this.usersForm.controls['password'].setValue(this.editData.password);
    }

  }

  addUsers() {
    if (!this.editData) {
      if (this.usersForm.valid) {
        this.userService.postUsers(this.usersForm.value)
          .subscribe({
            next: (res) => {
              alert("User added successfully")
              this.usersForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding User")
            }
          })

      }

    } else {
      this.updateUsers()
    }
  }

  updateUsers() {
    this.userService.putUsers(this.usersForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Users updated Successfully")
          this.usersForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the record!")
        }
      })
  }
}
