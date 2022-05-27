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
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path : '', component : LoginPageComponent
  },
  {
    path : 'Operators', component : OperatorsComponent,canActivate:[AuthGuard]
  },
  {
    path : 'Dashboard', component : DashboardComponent,canActivate:[AuthGuard]
  },
  {
    path : 'Warehouses', component : WarehousesComponent,canActivate:[AuthGuard]
  },
  {
    path : 'Items', component : ItemsComponent,canActivate:[AuthGuard]
  },
  {
    path : 'Orders', component : OrdersComponent,canActivate:[AuthGuard]
  },
  {
    path : 'Receipts', component : ReceiptsComponent,canActivate:[AuthGuard]
  },
  {
    path : 'Releases', component : ReleasesComponent,canActivate:[AuthGuard]
  },
  {
    path : 'Movements', component : MovementsComponent,canActivate:[AuthGuard]
  },
  {
    path : 'Customers', component : CustomersComponent,canActivate:[AuthGuard]
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
