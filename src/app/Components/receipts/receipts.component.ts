import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReceiptsService} from "../shared/receipts.service";
import {AddReceiptsComponent} from "./add-receipts/add-receipts.component";
import {ReleasesElementsComponent} from "../releases/releases-elements/releases-elements.component";
import {ReceiptsElementsComponent} from "./receipts-elements/receipts-elements.component";


@Component({
  selector: 'bmm-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  displayedColumns: string[] = ['documentNumber', 'warehouseId', 'customerId', 'creationDate', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private receiptsService: ReceiptsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllReceipts();
  }

  openDialog() {
    this.dialog.open(AddReceiptsComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        setTimeout(()=>{
        this.getAllReceipts();
        }, 500);
      }
    })
  }

  openReceiptsMovements(id: string) {
    localStorage.setItem('ReceiptsIdToElement', id)
    this.dialog.open(ReceiptsElementsComponent, {
      width: '80%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllReceipts();
      }
    })
  }

  getAllReceipts(){
    this.receiptsService.getReceipts()
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

  /*editArticles(row: any){
    this.dialog.open(AddReceiptsComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllReceipts();
      }
    });
  }*/

  /*deleteArticles(id:number){
    this.receiptsService.deleteReceipts(id)
      .subscribe({
        next:(res)=>{
          alert("Deleted Receipts Successfully");
          this.getAllReceipts();
        },
        error:()=>{
          alert("Error while deleting the receipts")
        }
      })
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
