import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import{NewUserComponent} from './components/new-user/new-user.component'

const routes: Routes = [
  {
    path: '',
    component:AppComponent,

    children : [
      {
        path: 'register',
        component:NewUserComponent
      

      }
     
     
    ]
     
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
