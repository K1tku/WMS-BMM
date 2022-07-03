import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService} from "../shared/user.service";
import {users} from "../shared/user.service";
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddUserComponent} from "./add-user/add-user.component";




@Component({
  selector: 'bmm-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  displayedColumns: string[] = ['username', 'name', 'surname','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService : UserService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog() {
    this.dialog.open(AddUserComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllUsers();
      }
    })
  }

  getAllUsers(){
    this.userService.getUsers()
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

  editUsers(row: any){
    this.dialog.open(AddUserComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllUsers();
      }
    });
  }

  deleteUsers(id:number){
    this.userService.deleteUsers(id)
      .subscribe({
        next:(res)=>{
          alert("Deleted Articles Successfully");
          this.getAllUsers();
        },
        error:()=>{
          alert("Error while deleting the articles")
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

