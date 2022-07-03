import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomerService} from "../shared/customer.service";
import {AddCustomerComponent} from "./add-customer/add-customer.component";


@Component({
  selector: 'bmm-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['name','street', 'city', 'postalCode', 'country', 'email', 'phoneNumber', 'customerContactPerson', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService: CustomerService, private dialog: MatDialog) { }



ngOnInit(): void {
  this.getAllCustomers();
}

openDialog() {
  this.dialog.open(AddCustomerComponent, {
    width: '30%'
  }).afterClosed().subscribe(val=>{
    if(val ==='save'){
      this.getAllCustomers();
    }
  })
}

getAllCustomers(){
  this.customerService.getCustomers()
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

editCustomers(row: any){
  this.dialog.open(AddCustomerComponent, {
    width: '30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllCustomers();
    }
  });
}

deleteCustomers(id:number){
  this.customerService.deleteCustomers(id)
    .subscribe({
      next:(res)=>{
        alert("Deleted Customer Successfully");
        this.getAllCustomers();
      },
      error:()=>{
        alert("Error while deleting the Customer")
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
