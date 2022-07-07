import { Component, OnInit, ViewChild } from '@angular/core';
import {AddwarehousesComponent} from "./../addwarehouses/addwarehouses.component";
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WarehousesService} from "../../shared/warehouses-service";
import {RowsComponent} from "./rows/rows.component";
import {WarehousesLocalizationService} from "../../shared/warehousesLocalization.service";
import {AddLocalizationComponent} from "./add-localization/add-localization.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'bmm-warehouses-localizations',
  templateUrl: './warehouses-localizations.component.html',
  styleUrls: ['./warehouses-localizations.component.css']
})
export class WarehousesLocalizationsComponent implements OnInit {

  localizationId !: FormGroup;

  displayedColumns: string[] = ['name','displayName', 'capacity', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private warehousesLocalizationService: WarehousesLocalizationService, private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllLocalizations();
  }
  openDialog() {
    this.dialog.open(AddLocalizationComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllLocalizations();
      }
    })
  }

  getAllLocalizations(){
    this.localizationIdToMovements();
    this.warehousesLocalizationService.getLocalizationsWarehouse(this.localizationId.value.warehouseId)
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err)=>{
          alert("Error while fetching the Records!")
        }
      })
  }

  editLocalization(row: any){
    this.dialog.open(AddLocalizationComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllLocalizations();
      }
    });
  }

  deleteLocalization(id:number){
    this.warehousesLocalizationService.deleteLocalizations(id)
      .subscribe({
        next:(res)=>{
          alert("Deleted localization Successfully");
          this.getAllLocalizations();
        },
        error:()=>{
          alert("Error while deleting the localizations")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  localizationIdToMovements(){
    this.localizationId = this.formBuilder.group({
      warehouseId: [localStorage.getItem('WarehouseID')],

    })

  }


}
