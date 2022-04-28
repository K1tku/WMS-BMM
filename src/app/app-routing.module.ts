import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginPageComponent} from "./Components/login-page/login-page.component";
import {AppComponent} from "../app/app.component";
import {MainPageComponent} from '../app/Components/main-page/main-page.component'
import {OperatorsComponent} from "./Components/operators/operators.component";
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {WarehousesComponent} from "./Components/warehouses/warehouses.component";
import {ItemsComponent} from "./Components/items/items.component";
import {OrdersComponent} from "./Components/orders/orders.component";
import {ReceiptsComponent} from "./Components/receipts/receipts.component";
import {ReleasesComponent} from "./Components/releases/releases.component";
import {MovementsComponent} from "./Components/movements/movements.component";
import {CustomersComponent} from "./Components/customers/customers.component";

const routes: Routes = [
  {
    path : '', component : LoginPageComponent,
  },
  {
    path : 'Operators', component : OperatorsComponent
  },
  {
    path : 'Dashboard', component : DashboardComponent
  },
  {
    path : 'Warehouses', component : WarehousesComponent
  },
  {
    path : 'Items', component : ItemsComponent
  },
  {
    path : 'Orders', component : OrdersComponent
  },
  {
    path : 'Receipts', component : ReceiptsComponent
  },
  {
    path : 'Releases', component : ReleasesComponent
  },
  {
    path : 'Movements', component : MovementsComponent
  },
  {
    path : 'Customers', component : CustomersComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OperatorsComponent,
  DashboardComponent,
  WarehousesComponent,
  ItemsComponent,
  OrdersComponent,
  ReceiptsComponent,
  ReleasesComponent,
  MovementsComponent,
  CustomersComponent,
  MainPageComponent

]
