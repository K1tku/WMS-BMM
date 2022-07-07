import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MovementsService} from "../../shared/movements.service";
import {AddUserComponent} from "../../operators/add-user/add-user.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReceiptsService} from "../../shared/receipts.service";


@Component({
  selector: 'bmm-movements-elements',
  templateUrl: './movements-elements.component.html',
  styleUrls: ['./movements-elements.component.css']
})
export class MovementsElementsComponent implements OnInit {

  movementsId !: FormGroup;

  displayedColumns: string[] = ['articleId', 'quantity', 'weight', 'sourceLocalizationId', 'targetLocalizationId','creationDate', 'sourceWarehouseId','targetWarehouseId', 'userId'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private movementsService: MovementsService, private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getElement();

  }

  getElement(){
    this.movementsIdToMovements();
    setTimeout(()=>{
      this.movementsService.getMovementsElements(this.movementsId.value.movementId)
        .subscribe({
          next:(res)=>{
            this.dataSource = new MatTableDataSource(res)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          ,
          error:(err)=>{
            alert("Error while fetching the Records!")
          }
        }) }, 0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  movementsIdToMovements(){
    this.movementsId = this.formBuilder.group({
      movementId: [localStorage.getItem('MovementsIdToElement')],

    })

  }


}

