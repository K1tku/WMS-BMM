import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule, routingComponents } from './app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule } from '@angular/forms';
import {AddUserComponent } from './Components/operators/add-user/add-user.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ItemService} from './Components/shared/item.service';
import { UserComponent } from './Components/user/user.component';
import { SignInComponent } from './Components/user/sign-in/sign-in.component';
import {UserService} from '../../src/app/Components/shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthGuard} from "./auth/auth.guard";
/*import {NgbModule} from '@ng-bootstrap/ng-bootstrap';*/






@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    routingComponents,
    AddUserComponent,
    UserComponent,
    SignInComponent
  ],
  entryComponents:[
   AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule

  ],
  exports:[
    MatSidenavModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [ItemService,UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
