import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../shared/customer.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'bmm-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerForm !: FormGroup;
  actionBtn: string = "Zapisz";

  constructor(private formBuilder: FormBuilder
    , private customerService: CustomerService
    , private dialogRef: MatDialogRef<AddCustomerComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) { }


  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })


    if (this.editData) {
      this.actionBtn = "Zaktualizuj";
      this.customerForm.controls['name'].setValue(this.editData.name);
      this.customerForm.controls['street'].setValue(this.editData.street);
      this.customerForm.controls['city'].setValue(this.editData.city);
      this.customerForm.controls['postalCode'].setValue(this.editData.postalCode);
      this.customerForm.controls['country'].setValue(this.editData.country);
      this.customerForm.controls['email'].setValue(this.editData.email);
      this.customerForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
    }

  }

  addCustomers() {
    if (!this.editData) {
      if (this.customerForm.valid) {
        this.customerService.postCustomers(this.customerForm.value)
          .subscribe({
            next: (res) => {
              alert("Customers added successfully")
              this.customerForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding customers")
            }
          })

      }

    } else {
      this.updateCustomers()
    }
  }
  updateCustomers(){
    this.customerService.putCustomers(this.customerForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Customers updated Successfully")
          this.customerForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")
        }
      })
  }


}
