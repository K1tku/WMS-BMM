import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ItemService} from "../shared/item.service";
import {AddArticleComponent} from "./add-article/add-article.component";



@Component({
  selector: 'bmm-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  displayedColumns: string[] = ['name','articleCode', 'weight', 'unitName', 'creationDate', 'modificationDate', 'user', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private itemService: ItemService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllArticles();
  }

  openDialog() {
    this.dialog.open(AddArticleComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllArticles();
      }
    })
  }

  getAllArticles(){
    this.itemService.getArticles()
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

  editArticles(row: any){
    this.dialog.open(AddArticleComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllArticles();
      }
    });
  }

  deleteArticles(id:number){
    this.itemService.deleteArticles(id)
      .subscribe({
        next:(res)=>{
          alert("Deleted Articles Successfully");
          this.getAllArticles();
        },
        error:()=>{
          alert("Error while deleting the articles")
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
