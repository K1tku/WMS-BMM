import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../shared/item.service'


@Component({
  selector: 'bmm-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private service: ItemService) { }

  ngOnInit(): void {
  }

}
