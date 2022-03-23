import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { LeftMenuComponent } from './Components/left-menu/left-menu.component';
import { TopBarComponent } from './Components/top-bar/top-bar.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LeftMenuComponent,
    TopBarComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
