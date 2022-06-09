import { Component, OnInit, ViewChild } from '@angular/core';
import {AddwarehousesComponent} from "./addwarehouses/addwarehouses.component";
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WarehousesService} from "../shared/warehouses-service";


@Component({
  selector: 'bmm-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'displayName', 'creationDate', 'modificationDate', 'capacity', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private warehousesService: WarehousesService) { }

  ngOnInit(): void {
    this.getAllWarehouses();
  }

  openDialog() {
    this.dialog.open(AddwarehousesComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllWarehouses();
      }
    })
  }

  getAllWarehouses(){
  this.warehousesService.getWarehouses()
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

  editWarehouses(row: any){
    this.dialog.open(AddwarehousesComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllWarehouses();
      }
    });
  }

  deleteWarehouses(id:number){
    this.warehousesService.deleteWarehouses(id)
      .subscribe({
        next:(res)=>{
          alert("Deleted Warehouses Successfully");
          this.getAllWarehouses();
        },
        error:()=>{
          alert("Error while deleting the warehouse")
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

}
