import { Component, OnInit, NgModule } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {AddUserComponent} from "./add-user/add-user.component";




export interface PeriodicElement {
  name: string;
  position: number;
  access: string;

}

const Users: PeriodicElement[] = [
  {position: 1, name: 'Maciej Dunal', access: 'Menager'},
  {position: 2, name: 'Mateusz Kosiński', access: 'Menager'},
  {position: 3, name: 'Bartłomiej Kot', access: 'Menager'},
  {position: 4, name: 'Krzysztof Kot', access: 'Worker'},
  {position: 5, name: 'Sebastian Krzemiński', access: 'Worker'},
  {position: 6, name: 'Piotr Folfasiński', access: 'Worker'}
];

export interface AcessElement {
  name: string;
  position: number;
  rights: string;

}

const AccesProfiles: AcessElement[] = [
  {position: 1, name: 'Worker', rights: 'Receipts, Releases'},
  {position: 2, name: 'Manager', rights: 'Receipts, Releases, Server Administration'},
];


@Component({
  selector: 'bmm-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'access','edit','delete'];
  dataSource = Users;

  displayedColumns_II: string[] = ['position', 'name', 'rights','edit','delete'];
  dataSource_II = AccesProfiles;


  constructor(private matBottomSheet: MatBottomSheet,private addUser_bottomSheet: MatBottomSheet) {}

  addUser_BottomSheet(): void {
    this.addUser_bottomSheet.open(AddUserComponent);
    panelClass: 'bottom-sheet-container'
  }

  ngOnInit(): void {

  }


}

