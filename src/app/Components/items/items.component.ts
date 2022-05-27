import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ItemService} from '../shared/item.service';
import {Observable} from 'rxjs';
import { CdkCellDef } from '@angular/cdk/table';
import {Article} from "./item/article";


@Component({
  selector: 'bmm-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  articleItems : any;

  data: Article[] = [];
  columnsToDisplay = ['name','unit','weight','articleCode','creationDate','modificationDate','user']

  constructor(private itemService : ItemService) {

    this.itemService.getArticles().subscribe(x => {
      this.data = x;
      console.log(this.data);
    })

  }

 /* OnSubmit(name: string,
           articleCode: string
           ){
    this.itemService.addArticles(art).subscribe((data : any)=>{})};*/

  ngOnInit() {
    /*this.itemService.getArticles().subscribe((data: any)=>{
    this.articleItems = data;
    });*/
  }

  article = new Article(undefined, '', undefined, '', undefined, '', undefined, '');
  errorMessage: string;

  addProduct() {
    if (!this.article) { return; }
    this.itemService.addArticles(this.article)
      .subscribe(
        product => this.article);
  }

}
