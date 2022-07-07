import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReceiptsService} from "../../shared/receipts.service";
import {AddUserComponent} from "../../operators/add-user/add-user.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReleaseService} from "../../shared/release.service";

@Component({
  selector: 'bmm-receipts-elements',
  templateUrl: './receipts-elements.component.html',
  styleUrls: ['./receipts-elements.component.css']
})
export class ReceiptsElementsComponent implements OnInit {

  receiptsId !: FormGroup;

  displayedColumns: string[] = ['articleId', 'quantity', 'weight', 'localizationId', 'creationDate', 'warehouseId', 'userId'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private receiptsService: ReceiptsService, private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getElement();

  }

  getElement(){
    this.receiptsIdToMovements();
    setTimeout(()=>{
      this.receiptsService.getReceiptsElements(this.receiptsId.value.receiptsId)
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

  receiptsIdToMovements(){
    this.receiptsId = this.formBuilder.group({
      receiptsId: [localStorage.getItem('ReceiptsIdToElement')],

    })

  }


}
