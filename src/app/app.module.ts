import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, NgModel, FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductService } from './services/product.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { TableService } from './services/table.service';
import { OrderService } from './services/order.service';
import { OrderManagerComponent } from './order-manager/order-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    OrderManagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule
  ],
  providers: [ProductService, TableService, OrderService, NgModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
