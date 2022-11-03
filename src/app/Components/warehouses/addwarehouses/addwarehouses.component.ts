import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {WarehousesService} from "../../shared/warehouses-service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'bmm-addwarehouses',
  templateUrl: './addwarehouses.component.html',
  styleUrls: ['./addwarehouses.component.css']
})
export class AddwarehousesComponent implements OnInit {

  warehousesForm !: FormGroup;
  actionBtn: string = "Zapisz";

  constructor(private formBuilder: FormBuilder
    , private warehousesService: WarehousesService
    , private dialogRef: MatDialogRef<AddwarehousesComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  ngOnInit(): void {
    this.warehousesForm = this.formBuilder.group({
      name: ['', Validators.required],
      displayName: ['', Validators.required],
      capacity: ['']
    })


    if (this.editData) {
      this.actionBtn = "Zaktualizuj";
      this.warehousesForm.controls['name'].setValue(this.editData.name);
      this.warehousesForm.controls['displayName'].setValue(this.editData.displayName);
      this.warehousesForm.controls['capacity'].setValue(this.editData.capacity);
    }
  }

  addWarehouses() {
    if (!this.editData) {
      if (this.warehousesForm.valid) {
        this.warehousesService.postWarehouses(this.warehousesForm.value)
          .subscribe({
            next: (res) => {
              alert("Warehouses added successfully")
              this.warehousesForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding warehouses")
            }
          })
      }
    } else {
      this.updateWarehouses()
    }
  }
  updateWarehouses(){
  this.warehousesService.putWarehouses(this.warehousesForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Warehouses updated Successfully")
        this.warehousesForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record!")
      }
    })
  }
}
