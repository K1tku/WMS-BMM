import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ReceiptsService} from "../../../shared/receipts.service";
import {AddReceiptsComponent} from "./../../add-receipts/add-receipts.component";
import {ItemService} from "../../../shared/item.service";
import {WarehousesLocalizationService} from "../../../shared/warehousesLocalization.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'bmm-add-receipts-elements',
  templateUrl: './add-receipts-elements.component.html',
  styleUrls: ['./add-receipts-elements.component.css']
})
export class AddReceiptsElementsComponent implements OnInit {

  receiptsElementsForm !: FormGroup;
  idOperationForm !: FormGroup;
  idWarehouseForm !: FormGroup;
  idLocalizationForm !: FormGroup;
  idArticleForm !: FormGroup;
  elementWeightForm !: FormGroup;
  actionBtn: string = "Save";

  dataSource!: MatTableDataSource<any>;

  constructor(private formBuilder: FormBuilder
    , private receiptsElementsService: ReceiptsService
    , private itemService: ItemService
    , private warehousesLocalizationService: WarehousesLocalizationService
    , private dialogRef: MatDialogRef<AddReceiptsElementsComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) { }

  Localizations: any;
  Articles: any;



  ngOnInit(): void {
    this.receiptsElementsForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      operationId: [''],
      warehouseId: [''],
      localizationId: [''],
      articleId: ['']

    })
    this.ViewChild();

    this.warehousesLocalizationService.getLocalizationsWarehouse(this.idWarehouseForm.value.warehouseId).subscribe((data: any) => {
      this.Localizations = data;
    })

    this.itemService.getArticles().subscribe((data: any) => {
      this.Articles = data;
    })


  }

  addReceiptsElements() {
    if (!this.editData) {
      if (this.receiptsElementsForm.valid) {
        this.receiptsElementsService.postReceiptsElements(this.receiptsElementsForm.value)
          .subscribe({
            next: (res) => {
              localStorage.setItem('ReceiptsElementsID', res.id);
              localStorage.setItem('ArticleID', JSON.stringify(this.receiptsElementsForm.value.articleId));
              localStorage.setItem('LocalizationID', JSON.stringify(this.receiptsElementsForm.value.localizationId));
              localStorage.setItem('Quantity', res.quantity);
              this.getArticleWeight();
              setTimeout(()=>{
              this.sumWeight();
              }, 100);
              setTimeout(()=>{
              this.putWeightToElement();
              }, 200);
              alert("Elements added successfully")
              this.receiptsElementsForm.reset();
              this.dialogRef.close('save');

              this.ViewChild();
              setTimeout(()=>{
              this.putOperationID();
              }, 300);
              setTimeout(()=>{
                this.putWarehouseID();
              }, 400);
              setTimeout(()=>{
                this.putLocalizationID();
              }, 500);
              setTimeout(()=>{
                this.putArticleID();
              }, 600);
            },
            error: () => {
              alert("Error while adding Element")
            }
          })

      }

    } else {
    }
  }


  putOperationID() {
    this.receiptsElementsService.putOperation(this.idOperationForm.value)
      .subscribe({
        next: (res) => {
        }
      })
  }
  putWarehouseID() {
    this.receiptsElementsService.putWarehouseElem(this.idWarehouseForm.value)
      .subscribe({
        next: (res) => {
        }
      })
  };
  putLocalizationID() {
    this.receiptsElementsService.putLocalization(this.idLocalizationForm.value)
      .subscribe({
        next: (res) => {
        }
      })
  };
  putArticleID() {
    this.receiptsElementsService.putArticle(this.idArticleForm.value)
      .subscribe({
        next: (res) => {
          /*localStorage.removeItem('LocalizationID');
          localStorage.removeItem('WarehouseID');
          localStorage.removeItem('LocID');
          localStorage.removeItem('ReceiptsID');
          localStorage.removeItem('CustomerID');
          localStorage.removeItem('ReceiptsElementsID');
          localStorage.removeItem('ArticleID');
          localStorage.removeItem('SumWeightArticle');
          localStorage.removeItem('ArticleWeight');
          localStorage.removeItem('Quantity');*/
        }
      })
  };


  ViewChild() {
    this.idOperationForm = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsElementsID')],
        operationId: [localStorage.getItem('ReceiptsID')]
      }),
      this.idWarehouseForm = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsElementsID')],
        warehouseId: [localStorage.getItem('WarehouseID')]
      }),
      this.idLocalizationForm = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsElementsID')],
        localizationId: [localStorage.getItem('LocalizationID')]
      }),
      this.idArticleForm = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsElementsID')],
        articleId: [localStorage.getItem('ArticleID')]
      })


  }

  getArticleWeight(){
    this.receiptsElementsService.getArticleWeight(this.receiptsElementsForm.value.articleId)
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res)
          localStorage.setItem('ArticleWeight', res.weight);
        },
        error:(err)=>{
          alert("Error while fetching the Records!")
        }
      })
  }


//Obliczanie wagi towaru i dodawanie do tabeli
  sumWeight(){

    var elementQuantity = localStorage.getItem('Quantity');
    var aWeight = localStorage.getItem('ArticleWeight');

    var elementQuantityNumber = Number(elementQuantity)
    var aWeightNumber = Number(aWeight)

    //let sum = [elementQuantity!, aWeight!].reduce((x,y) => x + y);

    let sum = elementQuantityNumber * aWeightNumber

    localStorage.setItem('SumWeightArticle',JSON.stringify(sum));
  }

  putWeightToElement(){
    this.elementWeightForm = this.formBuilder.group({
      weight: [localStorage.getItem('SumWeightArticle')],
      quantity: [localStorage.getItem('Quantity')]
    })

    this.receiptsElementsService.putReceiptsElements(this.elementWeightForm.value, this.idArticleForm.value.resourceId)
      .subscribe({
        next: (res) => {
        }
      })
  }

}
