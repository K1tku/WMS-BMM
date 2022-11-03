import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MovementsService} from "../../shared/movements.service";
import {WarehousesService} from "../../shared/warehouses-service";
import {CustomerService} from "../../shared/customer.service";
import {AddMovementsElementsComponent} from "./add-movements-elements/add-movements-elements.component";


@Component({
  selector: 'bmm-add-movements',
  templateUrl: './add-movements.component.html',
  styleUrls: ['./add-movements.component.css']
})
export class AddMovementsComponent implements OnInit {

  movementsForm !: FormGroup;
  idWarehouses !: FormGroup;
  idTargetWarehouses !: FormGroup;
  actionBtn: string = "Zapisz";

  constructor(private formBuilder: FormBuilder
    , private movementsService: MovementsService
    , private warehousesService: WarehousesService
    , private customerService: CustomerService
    , private dialogRef: MatDialogRef<AddMovementsComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any
    , private dialog: MatDialog) { }

  Warehouses: any;
  Customer: any;

  ngOnInit(): void {
    this.movementsForm = this.formBuilder.group({
      warehouseId: ['', Validators.required],
      targetWarehouseId: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.warehousesService.getWarehouses().subscribe((data: any) => {
      this.Warehouses = data;
    })

  }

  addMovements() {
    if (!this.editData) {
      if (this.movementsForm.valid) {
        this.movementsService.postMovement(this.movementsForm.value)
          .subscribe({
            next: (res) => {
              localStorage.setItem('ReceiptsID', res.id);
              localStorage.setItem('TargetWarehouseID', JSON.stringify(this.movementsForm.value.targetWarehouseId));
              localStorage.setItem('WarehouseID', JSON.stringify(this.movementsForm.value.warehouseId));

              alert("Articles added successfully")
              this.dialogRef.close('save');
              this.movementsForm.reset();
              this.ViewChild();
              this.putWarehouseID();
              setTimeout(()=>{
                this.putTargetWarehousesID();
              }, 300);
              this.openAddReceiptsElements();
            },
            error: () => {
              alert("Error while adding Receipts")
            }
          })
      }
    }
  }



  putWarehouseID() {
    this.movementsService.putWarehouses(this.idWarehouses.value)
      .subscribe({
        next: (res) => {
        }
      })
  }
  putTargetWarehousesID() {
    this.movementsService.putTargetWarehouses(this.idTargetWarehouses.value)
      .subscribe({
        next: (res) => {
        }
      })
  };

  ViewChild() {
    this.idWarehouses = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsID')],
        warehouseId: [localStorage.getItem('WarehouseID')]
      },
      this.idTargetWarehouses = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsID')],
        warehouseId: [localStorage.getItem('TargetWarehouseID')]
      }))
  }

  openAddReceiptsElements() {
    this.dialog.open(AddMovementsElementsComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        // this.getAllReceipts();
      }
    })
  }

}
