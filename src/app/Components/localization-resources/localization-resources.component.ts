import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {localizationResourcesService} from "../shared/localizationResources.service";


@Component({
  selector: 'bmm-localization-resources',
  templateUrl: './localization-resources.component.html',
  styleUrls: ['./localization-resources.component.css']
})
export class LocalizationResourcesComponent implements OnInit {

  displayedColumns: string[] = ['articleCode', 'articleId', 'quantity', 'weight', 'warehouseId', 'localizationId'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private lResourceService: localizationResourcesService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAlllocalizationResources();
  }


  getAlllocalizationResources(){
    this.lResourceService.getLocalizationResources()
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
