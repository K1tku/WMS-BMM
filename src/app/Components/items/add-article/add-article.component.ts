import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ItemService} from "../../shared/item.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {WarehousesService} from "../../shared/warehouses-service";


@Component({
  selector: 'bmm-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  articlesForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder
    , private itemService: ItemService
    , private dialogRef: MatDialogRef<AddArticleComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  Units: any;


  ngOnInit(): void {
    this.articlesForm = this.formBuilder.group({
      name: ['', Validators.required],
      articleCode: ['', Validators.required],
      weight: ['', Validators.required],
      unitName: ['', Validators.required]
    })


    if (this.editData) {
      this.actionBtn = "Update";
      this.articlesForm.controls['name'].setValue(this.editData.name);
      this.articlesForm.controls['articleCode'].setValue(this.editData.articleCode);
      this.articlesForm.controls['weight'].setValue(this.editData.weight);
      this.articlesForm.controls['unitName'].setValue(this.editData.unit);
    }

   this.itemService.getUnits().subscribe((data:any)=> {
      this.Units = data;
    })
  }

  addArticles() {
    if (!this.editData) {
      if (this.articlesForm.valid) {
        this.itemService.postArticles(this.articlesForm.value)
          .subscribe({
            next: (res) => {
              //Dodanie unit do danej pozycji
              this.itemService.putUnits(this.articlesForm.value)
                .subscribe({
                  next: (res) => {
                    /*this.articlesForm.reset();
                    this.dialogRef.close('save');*/
                  }
                })
              alert("Articles added successfully")
              this.articlesForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding articles")
            }
          })

      }

    } else {
      this.updateArticles()
    }
  }
  updateArticles(){
    this.itemService.putArticles(this.articlesForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          //Dodanie unit do danej pozycji
          this.itemService.putUnits(this.articlesForm.value)
            .subscribe({
              next: (res) => {
                /*this.articlesForm.reset();
                this.dialogRef.close('save');*/
              }
            })
          alert("Articles updated Successfully")
          this.articlesForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")
        }
      })
  }


}
