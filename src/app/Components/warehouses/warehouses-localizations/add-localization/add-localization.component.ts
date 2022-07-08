import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {WarehousesLocalizationService} from "../../../shared/warehousesLocalization.service";

@Component({
  selector: 'bmm-add-localization',
  templateUrl: './add-localization.component.html',
  styleUrls: ['./add-localization.component.css']
})
export class AddLocalizationComponent implements OnInit {

  localizationsForm !: FormGroup;
  addWToLoc !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder
    , private localizationService: WarehousesLocalizationService
    , private dialogRef: MatDialogRef<AddLocalizationComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.localizationsForm = this.formBuilder.group({
      name: ['', Validators.required],
      displayName: ['', Validators.required],
      capacity: ['', Validators.required],
      warehouseId: [localStorage.getItem('WarehouseID')]
    })


    if (this.editData) {
      this.actionBtn = "Update";
      this.localizationsForm.controls['name'].setValue(this.editData.name);
      this.localizationsForm.controls['displayName'].setValue(this.editData.displayName);
      this.localizationsForm.controls['capacity'].setValue(this.editData.capacity);
    }

  }

  addLocalization() {
    if (!this.editData) {
      if (this.localizationsForm.valid) {
        this.localizationService.postLocalizations(this.localizationsForm.value)
          .subscribe({
            next: (res) => {
              localStorage.setItem('LocID', res.id);
              alert("Localization added successfully")
              this.localizationsForm.reset();
              this.dialogRef.close('save');
              this.ViewChild();
              this.addWareToRow();
            },
            error: () => {
              alert("Error while adding Lozalization")
            }
          })

      }

    } else {
      this.updateLocalizations()
    }
  }
  updateLocalizations(){
    this.localizationService.putLocalizations(this.localizationsForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Localization updated Successfully")
          this.localizationsForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")
        }
      })

  }

  ViewChild() {
    this.addWToLoc = this.formBuilder.group({
      resourceId: [localStorage.getItem('LocID')],
      warehouseId: [localStorage.getItem('WarehouseID')]
    })
  }

  addWareToRow(){
    this.localizationService.putIdToLocalizations(this.addWToLoc.value)
      .subscribe({
        next: (res) => {
         /* localStorage.removeItem('WarehouseID');*/
        }
      })
  }


}
