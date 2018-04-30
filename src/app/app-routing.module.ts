import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';

const routes: Routes = [	
	{ path: '', redirectTo: '/admin', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'order', component: OrderManagerComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }