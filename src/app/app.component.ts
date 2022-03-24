import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WMS-BMM';

  displayLogin: boolean=false;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.displayLogin = true;
      } else {
        this.displayLogin = false;
      }

    });

  }

  ngOnInit() {


  }


}
