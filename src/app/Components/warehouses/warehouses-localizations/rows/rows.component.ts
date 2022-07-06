import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AddwarehousesComponent} from "./../../addwarehouses/addwarehouses.component";
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WarehousesService} from "../../../shared/warehouses-service";
import {WarehousesLocalizationsComponent} from "./../../warehouses-localizations/warehouses-localizations.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../../shared/item.service";
import {WarehousesLocalizationService} from "../../../shared/warehousesLocalization.service";



@Component({
  selector: 'bmm-rows',
  templateUrl: './rows.component.html',
  styleUrls: ['./rows.component.css']
})
export class RowsComponent implements OnInit {

  rowsForm !: FormGroup;
  addWToRow !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder
    , private warehousesLocalizationService: WarehousesLocalizationService
    , private dialogRef: MatDialogRef<RowsComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) { }



  ngOnInit(): void {

    this.rowsForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      warehouseId: [localStorage.getItem('WarehouseID')]
    })

  }
  /*public getData(wid: string) {
    return localStorage.getItem('WarehouseID')
  }*/


/*
  addRows() {
      if (this.rowsForm.valid) {
        this.warehousesLocalizationService.postRows(this.rowsForm.value)
          .subscribe({
            next: (res) => {
              localStorage.setItem('RowID', res.id);
              alert("Row added successfully")
              this.rowsForm.reset();
              this.dialogRef.close('save');
              this.ViewChild();
              this.addWareToRow();
            },
            error: () => {
              alert("Error while adding rows")
            }
          })
        }
      }
  ViewChild() {
    this.addWToRow = this.formBuilder.group({
      resourceId: [localStorage.getItem('RowID')],
      warehouseId: [localStorage.getItem('WarehouseID')]
    })
  }

      addWareToRow(){
        this.warehousesLocalizationService.putIdToRows(this.addWToRow.value)
          .subscribe({
            next: (res) => {
              localStorage.removeItem('RowID');
              localStorage.removeItem('WarehouseID');
            }
          })
      }*/
}
