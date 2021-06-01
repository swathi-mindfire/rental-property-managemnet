import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import{User} from './../../model/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData = {'email':"",'password':""};
  loginForm :FormGroup;
  hide= true;
  errormsg="";

  constructor(private _us: UserService, private router :Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this._us.loginCheck.subscribe();
    this.loginForm = new FormGroup(
      {
        email : new FormControl('',[Validators.required,Validators.email]),
        password :new FormControl('',[Validators.required,Validators.minLength(8)])
      }
    );
  }
  
  onLogin(){
    if (this.loginForm.invalid) {
      return;
    }
  
    this.formData.email =this.loginForm.value.email;
    this.formData.password  = this.loginForm.value.password;

    this._us.authenticate(this.formData).subscribe(
      (res)=>{
        localStorage.setItem('id', res['id']);
        localStorage.setItem('token', res['token']);
        this.errormsg = null;
        this._us.loginCheck.next({loggedIn:true})
        this.router.navigate(['/dashboard',res['id']]);
      },
      (err)=>{
       
        this.errormsg= err.error;
        
      }
    )   
  }
  closeDialog(): void {

      this.dialog.closeAll();
  }


}
