import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPropertyComponent } from './components/add-new-property/add-new-property.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import{NewUserComponent} from './components/new-user/new-user.component'
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    component:HomeComponent
  },
 
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path:'signup',
    component:NewUserComponent
  },
  {
    path:'newproperty',
    component:AddNewPropertyComponent
  },
  {
    path:'propertydetails/:id',
    component:PropertyDetailsComponent
  },
  {
    path:'dashboard/:id',
    component:DashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
