import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  name: string;
  position: number;
  capasity: string;

}

const Warehouses: PeriodicElement[] = [
  {position: 1, name: 'MAG WG', capasity: '20%'},
  {position: 2, name: 'Magazyn MAT', capasity: '40%'}
];


@Component({
  selector: 'bmm-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'capasity','edit','delete'];
  dataSource = Warehouses;

  constructor() { }

  ngOnInit(): void {
  }

}
