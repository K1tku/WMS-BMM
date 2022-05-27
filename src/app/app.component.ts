import { Component, OnInit, ViewChild  } from '@angular/core';
import { Location} from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WMS-BMM';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  displayLogin: boolean = false;
  displayLoginv2: string;

  constructor(location: Location, private router: Router, private observer: BreakpointObserver) {
      router.events.subscribe((val) => {
        if(location.path() != ''){
          this.displayLogin = true;
          this.displayLoginv2 = 'block';
        } else {
          this.displayLogin = false;
          this.displayLoginv2 = 'none';
        }

      });
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1000px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
  Logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['']);
  }
}
