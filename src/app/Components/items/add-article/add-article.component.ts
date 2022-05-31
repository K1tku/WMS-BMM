import {Component, Inject, OnInit} from '@angular/core';
import {ItemService} from '../../shared/item.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Article} from '../../items/item/article';

@Component({
  selector: 'bmm-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  unit: any;
  weight: any;

  constructor(private itemService: ItemService,
              @Inject(MAT_DIALOG_DATA) public editArticle: any) {


  }

  OnSubmit(name: string,
          /* unit: any,*/
           weight: string,
           articleCode: string
  ) {
    this.itemService.addArticles(name,weight,articleCode).subscribe((data: any) => {
        console.log(data)
      }

    )
  };



  ngOnInit(): void {
  }

}
