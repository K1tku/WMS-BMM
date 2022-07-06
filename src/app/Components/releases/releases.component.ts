import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReleaseService} from "../shared/release.service";
import {AddReleasesComponent} from "./add-releases/add-releases.component";

@Component({
  selector: 'bmm-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  displayedColumns: string[] = ['documentNumber', 'warehouseId', 'customerId', 'creationDate', 'description'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private releaseService: ReleaseService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllReleases();
  }

  openDialog() {
    this.dialog.open(AddReleasesComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        setTimeout(()=>{
          this.getAllReleases();
        }, 500);
      }
    })
  }

  getAllReleases(){
    this.releaseService.getRelease()
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
