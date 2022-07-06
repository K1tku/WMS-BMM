import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MovementsService} from "../../../shared/movements.service";
import {ItemService} from "../../../shared/item.service";
import {WarehousesLocalizationService} from "../../../shared/warehousesLocalization.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'bmm-add-movements-elements',
  templateUrl: './add-movements-elements.component.html',
  styleUrls: ['./add-movements-elements.component.css']
})
export class AddMovementsElementsComponent implements OnInit {

  movementsElementsForm !: FormGroup;
  idOperationForm !: FormGroup;
  idWarehouseForm !: FormGroup;
  idTargetWarehouseForm !: FormGroup;
  idLocalizationForm !: FormGroup;
  idTargetLocalizationForm !: FormGroup;
  idArticleForm !: FormGroup;
  elementWeightForm !: FormGroup;
  actionBtn: string = "Save";

  dataSource!: MatTableDataSource<any>;

  constructor(private formBuilder: FormBuilder
    , private movementsElementsService: MovementsService
    , private itemService: ItemService
    , private warehousesLocalizationService: WarehousesLocalizationService
    , private dialogRef: MatDialogRef<AddMovementsElementsComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) { }

  Localizations: any;
  Articles: any;

  ngOnInit(): void {
    this.movementsElementsForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      operationId: [''],
      sourceWarehouseId: [''],
      targetWarehouseId: [''],
      sourceLocalizationId: [''],
      targetLocalizationId: [''],
      articleId: ['']

    })

    this.warehousesLocalizationService.getLocalizations().subscribe((data: any) => {
      this.Localizations = data;
    })

    this.itemService.getArticles().subscribe((data: any) => {
      this.Articles = data;
    })

  }

  addMovementsElements() {
    if (!this.editData) {
      if (this.movementsElementsForm.valid) {
        this.movementsElementsService.postMovementElements(this.movementsElementsForm.value)
          .subscribe({
            next: (res) => {
              localStorage.setItem('ReceiptsElementsID', res.id);
              localStorage.setItem('ArticleID', JSON.stringify(this.movementsElementsForm.value.articleId));
              localStorage.setItem('LocalizationID', JSON.stringify(this.movementsElementsForm.value.sourceLocalizationId));
              localStorage.setItem('TargetLocalizationID', JSON.stringify(this.movementsElementsForm.value.targetLocalizationId));
              localStorage.setItem('Quantity', res.quantity);
              this.getArticleWeight();
              setTimeout(()=>{
                this.sumWeight();
              }, 0);
              setTimeout(()=>{
                this.putWeightToElement();
              }, 50);
              alert("Elements added successfully")
              this.movementsElementsForm.reset();
              this.dialogRef.close('save');

              this.ViewChild();
              setTimeout(()=>{
                this.putOperationID();
              }, 80);
              setTimeout(()=>{
                this.putWarehouseID();
              }, 120);
              setTimeout(()=>{
                this.putTargetWarehouseID();
              }, 160);
              setTimeout(()=>{
                this.putLocalizationID();
              }, 200);
              setTimeout(()=>{
                this.putTargetLocalizationID();
              }, 240);
              setTimeout(()=>{
                this.putArticleID();
              }, 280);
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
    this.movementsElementsService.putOperation(this.idOperationForm.value)
      .subscribe({
        next: (res) => {
        }
      })
  }
  putWarehouseID() {
    this.movementsElementsService.putWarehouseElem(this.idWarehouseForm.value)
      .subscribe({
        next: (res) => {
        }
      })
  };
  putTargetWarehouseID() {
    this.movementsElementsService.putTargetWarehouseElem(this.idTargetWarehouseForm.value)
      .subscribe({
        next: (res) => {
        }
      })
  };
  putLocalizationID() {
    this.movementsElementsService.putLocalization(this.idLocalizationForm.value)
      .subscribe({
        next: (res) => {
        }
      })
  };
  putTargetLocalizationID() {
    this.movementsElementsService.putTargetLocalization(this.idTargetLocalizationForm.value)
      .subscribe({
        next: (res) => {
        }
      })
  };
  putArticleID() {
    this.movementsElementsService.putArticle(this.idArticleForm.value)
      .subscribe({
        next: (res) => {
          localStorage.removeItem('LocalizationID');
          localStorage.removeItem('WarehouseID');
          localStorage.removeItem('LocID');
          localStorage.removeItem('ReceiptsID');
          localStorage.removeItem('CustomerID');
          localStorage.removeItem('ReceiptsElementsID');
          localStorage.removeItem('ArticleID');
          localStorage.removeItem('SumWeightArticle');
          localStorage.removeItem('ArticleWeight');
          localStorage.removeItem('Quantity');
          localStorage.removeItem('TargetWarehouseID');
          localStorage.removeItem('TargetLocalizationID');
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
      this.idTargetWarehouseForm = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsElementsID')],
        warehouseId: [localStorage.getItem('TargetWarehouseID')]
      }),
      this.idLocalizationForm = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsElementsID')],
        localizationId: [localStorage.getItem('LocalizationID')]
      }),
      this.idTargetLocalizationForm = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsElementsID')],
        localizationId: [localStorage.getItem('TargetLocalizationID')]
      }),
      this.idArticleForm = this.formBuilder.group({
        resourceId: [localStorage.getItem('ReceiptsElementsID')],
        articleId: [localStorage.getItem('ArticleID')]
      })


  }

  getArticleWeight(){
    this.movementsElementsService.getArticleWeight(this.movementsElementsForm.value.articleId)
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

    this.movementsElementsService.putMovementElements(this.elementWeightForm.value, this.idArticleForm.value.resourceId)
      .subscribe({
        next: (res) => {
        }
      })
  }

}
