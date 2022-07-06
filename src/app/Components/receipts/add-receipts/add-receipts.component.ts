import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ReceiptsService} from "../../shared/receipts.service";
import {WarehousesService} from "../../shared/warehouses-service";
import {CustomerService} from "../../shared/customer.service";
import {AddReceiptsElementsComponent} from "./add-receipts-elements/add-receipts-elements.component";

@Component({
  selector: 'bmm-add-receipts',
  templateUrl: './add-receipts.component.html',
  styleUrls: ['./add-receipts.component.css']
})
export class AddReceiptsComponent implements OnInit {

  receiptsForm !: FormGroup;
  idWarehouses !: FormGroup;
  idCustomers !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder
    , private receiptsService: ReceiptsService
    , private warehousesService: WarehousesService
    , private customerService: CustomerService
    , private dialogRef: MatDialogRef<AddReceiptsComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any
    , private dialog: MatDialog) {
  }

  Warehouses: any;
  Customer: any;

  ngOnInit(): void {
    this.receiptsForm = this.formBuilder.group({
      warehouseId: ['', Validators.required],
      customerId: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.warehousesService.getWarehouses().subscribe((data: any) => {
      this.Warehouses = data;
    })

    this.customerService.getCustomers().subscribe((data: any) => {
      this.Customer = data;
    })

  }

  addReceipts() {
    if (!this.editData) {
      if (this.receiptsForm.valid) {
        this.receiptsService.postReceipts(this.receiptsForm.value)
          .subscribe({
            next: (res) => {
              localStorage.setItem('ReceiptsID', res.id);
              localStorage.setItem('CustomerID', JSON.stringify(this.receiptsForm.value.customerId));
              localStorage.setItem('WarehouseID', JSON.stringify(this.receiptsForm.value.warehouseId));

              alert("Articles added successfully")
              this.dialogRef.close('save');
              this.receiptsForm.reset();
              this.ViewChild();
              this.putCustomerID();
              setTimeout(()=>{
              this.putWarehouseID();
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
    this.receiptsService.putWarehouses(this.idWarehouses.value)
      .subscribe({
        next: (res) => {
        }
      })
  }
  putCustomerID() {
    this.receiptsService.putCustomer(this.idCustomers.value)
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
      this.idCustomers = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsID')],
        customerId: [localStorage.getItem('CustomerID')]
    }))
  }

  openAddReceiptsElements() {
    this.dialog.open(AddReceiptsElementsComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
         // this.getAllReceipts();
      }
    })
  }

}
