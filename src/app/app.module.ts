import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductService } from './services/product.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './home/product-card/product-card.component';
import { TablesComponent } from './home/tables/tables.component';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    ProductCardComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ProductService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
