import { Injectable } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    articleCode: new FormControl(''),
    name: new FormControl(''),
    weight: new FormControl(''),
    unit: new FormControl(''),


  });
}
