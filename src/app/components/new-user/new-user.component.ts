import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from '@angular/forms'
import{passwordChecker} from './../../custom-validators/password-checker'

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {


  registerForm:FormGroup;
  submitted = false;
  hide= true;
  constructor(private formbuilder:FormBuilder){

  }
  ngOnInit(){
    this.registerForm = this.formbuilder.group(
      {
        username: ['',[Validators.required,Validators.minLength(3)]],
        mobile: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],   
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword :['',Validators.required],
       

      });
    }
    onReset(){
      this.submitted= false;
      this.registerForm.reset();
    }
    onSubmit(){
      this.submitted = true;
      if( this.registerForm.invalid)
      return
    
    }
  ngOnDestroy(){

  }
  get h(){
    return this.registerForm.controls;
  }

 

}