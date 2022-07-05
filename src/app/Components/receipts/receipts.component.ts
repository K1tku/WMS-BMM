import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReceiptsService} from "../shared/receipts.service";
import {AddReceiptsComponent} from "./add-receipts/add-receipts.component";


@Component({
  selector: 'bmm-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  displayedColumns: string[] = ['documentNumber', 'warehouseId', 'customerId', 'creationDate', 'description'];
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
