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
import {UserComponent } from './Components/user/user.component';
import {SignInComponent } from './Components/user/sign-in/sign-in.component';
import {UserService} from '../../src/app/Components/shared/user.service';
import {HttpClientModule } from '@angular/common/http';
import {AuthGuard} from "./auth/auth.guard";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {AddArticleComponent } from './Components/items/add-article/add-article.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddwarehousesComponent } from './Components/warehouses/addwarehouses/addwarehouses.component';
import { AddCustomerComponent } from './Components/customers/add-customer/add-customer.component';
import { WarehousesLocalizationsComponent } from './Components/warehouses/warehouses-localizations/warehouses-localizations.component';
import { RowsComponent } from './Components/warehouses/warehouses-localizations/rows/rows.component';
import { RacksComponent } from './Components/warehouses/warehouses-localizations/racks/racks.component';
import { LevelsComponent } from './Components/warehouses/warehouses-localizations/levels/levels.component';
import { PlacesComponent } from './Components/warehouses/warehouses-localizations/places/places.component';
import { AddLocalizationComponent } from './Components/warehouses/warehouses-localizations/add-localization/add-localization.component';
import { AddReceiptsComponent } from './Components/receipts/add-receipts/add-receipts.component';
import { AddReceiptsElementsComponent } from './Components/receipts/add-receipts/add-receipts-elements/add-receipts-elements.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    routingComponents,
    AddUserComponent,
    UserComponent,
    SignInComponent,
    AddArticleComponent,
    AddwarehousesComponent,
    AddCustomerComponent,
    WarehousesLocalizationsComponent,
    RowsComponent,
    RacksComponent,
    LevelsComponent,
    PlacesComponent,
    AddLocalizationComponent,
    AddReceiptsComponent,
    AddReceiptsElementsComponent
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
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule

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
