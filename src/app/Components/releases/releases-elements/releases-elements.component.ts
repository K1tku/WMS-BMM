import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReleaseService} from "../../shared/release.service";
import {AddReleasesComponent} from "./../add-releases/add-releases.component";
import {AddUserComponent} from "../../operators/add-user/add-user.component";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'bmm-releases-elements',
  templateUrl: './releases-elements.component.html',
  styleUrls: ['./releases-elements.component.css']
})
export class ReleasesElementsComponent implements OnInit {

  releasesId !: FormGroup;

  displayedColumns: string[] = ['articleId', 'quantity', 'weight', 'localizationId', 'creationDate', 'warehouseId', 'userId'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private releaseService: ReleaseService, private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getElement();

  }



  getElement(){
    this.releasesIdToMovements();
    setTimeout(()=>{
    this.releaseService.getReleaseElements(this.releasesId.value.releaseId)
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

  releasesIdToMovements(){
    this.releasesId = this.formBuilder.group({
      releaseId: [localStorage.getItem('ReleaseIdToElement')],

    })

  }


}

