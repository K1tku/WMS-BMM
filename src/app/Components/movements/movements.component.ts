import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MovementsService} from "../shared/movements.service";
import {AddMovementsComponent} from "./add-movements/add-movements.component";


@Component({
  selector: 'bmm-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  displayedColumns: string[] = ['documentNumber', 'sourceWarehouseId', 'targetWarehouseId', 'creationDate', 'description'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private movementService: MovementsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllMovements();
  }

  openDialog() {
    this.dialog.open(AddMovementsComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        setTimeout(()=>{
          this.getAllMovements();
        }, 500);
      }
    })
  }

  getAllMovements(){
    this.movementService.getMovement()
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
