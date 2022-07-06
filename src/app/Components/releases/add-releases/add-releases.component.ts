import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ReleaseService} from "../../shared/release.service";
import {WarehousesService} from "../../shared/warehouses-service";
import {CustomerService} from "../../shared/customer.service";
import {AddReleasesElementsComponent} from "./add-releases-elements/add-releases-elements.component";

@Component({
  selector: 'bmm-add-releases',
  templateUrl: './add-releases.component.html',
  styleUrls: ['./add-releases.component.css']
})
export class AddReleasesComponent implements OnInit {

  releaseForm !: FormGroup;
  idWarehouses !: FormGroup;
  idCustomers !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder
    , private ReleaseService: ReleaseService
    , private warehousesService: WarehousesService
    , private customerService: CustomerService
    , private dialogRef: MatDialogRef<AddReleasesComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any
    , private dialog: MatDialog) { }

  Warehouses: any;
  Customer: any;

  ngOnInit(): void {
    this.releaseForm = this.formBuilder.group({
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

  addRelease() {
    if (!this.editData) {
      if (this.releaseForm.valid) {
        this.ReleaseService.postRelease(this.releaseForm.value)
          .subscribe({
            next: (res) => {
              localStorage.setItem('ReceiptsID', res.id);
              localStorage.setItem('CustomerID', JSON.stringify(this.releaseForm.value.customerId));
              localStorage.setItem('WarehouseID', JSON.stringify(this.releaseForm.value.warehouseId));

              alert("Articles added successfully")
              this.dialogRef.close('save');
              this.releaseForm.reset();
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
    this.ReleaseService.putWarehouses(this.idWarehouses.value)
      .subscribe({
        next: (res) => {
        }
      })
  }
  putCustomerID() {
    this.ReleaseService.putCustomer(this.idCustomers.value)
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
    this.dialog.open(AddReleasesElementsComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        // this.getAllReceipts();
      }
    })
  }

}
