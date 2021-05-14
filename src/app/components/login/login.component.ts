import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import{User} from './../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData={email:"",password:""};
  loginForm :FormGroup;
  hide= true;

  constructor(public _http: UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email : new FormControl('',[Validators.required,Validators.email]),
        password :new FormControl('',[Validators.required,Validators.minLength(8)])
      }
    );
  }
  
  onLogin(){
    this.formData.email=this.loginForm.value.email;
    this.formData.password  = this.loginForm.value.password;
    this._http.authenticate(this.formData).subscribe(
      ()=>{
        console.log("success")
      },
      ()=>{
        console.log("Invald")
      }
    )
    
   
   

  }

}
