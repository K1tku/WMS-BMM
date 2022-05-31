import { Component, OnInit, ViewChild  } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ItemService} from '../shared/item.service';
import {Observable} from 'rxjs';
import { CdkCellDef } from '@angular/cdk/table';
import {Article} from "./item/article";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddArticleComponent} from '../items/add-article/add-article.component'
import {UpdateArticleComponent} from "./update-article/update-article.component";







@Component({
  selector: 'bmm-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  articleItems: any;

  data: Article[] = [];
  columnsToDisplay: string[] = ['name', 'unit', 'weight', 'articleCode', 'creationDate', 'modificationDate', 'user', 'action']
  dataSource!: MatTableDataSource<Article>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private itemService: ItemService, private dialog: MatDialog) {

     this.itemService.getArticles().subscribe((data) => {
       console.log(this.data);

       this.posts = data;
       // Assign the data to the data source for the table to render
       this.dataSource = new MatTableDataSource(this.posts);

       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


/*  OnSubmit(name: string,
           unit:undefined,
           weight:string,
           articleCode: string
  ) {
    this.itemService.addArticles(name,unit,weight,articleCode).subscribe((data: any) => {
        console.log(data)
      }
    )
  };
*/
  openDialog() {
    this.dialog.open(AddArticleComponent, {
     width: '30%'
    });
  }

  openEditArticle(row: any){
    this.dialog.open(AddArticleComponent, {
      width: '30%',
      data: row
    });
  }


  ngOnInit(): void {
  }

}
