import {FormGroup} from '@angular/forms'
/*we can work with classes like 
class PasswordChecker extendsFormGroup {
     methods  to validated/required
}
*/
export function passwordChecker(
    controlName:string,
    compareControlName:string
    
   )  {
       return(formGroup :FormGroup)=>{
           const password = formGroup.controls[controlName];
           const confPassword = formGroup.controls[compareControlName];
        

           if(password.value!== confPassword){
               confPassword.setErrors({mustmatch :true})

           }
           else{
               confPassword.setErrors({mustmatch :null});
           }
       }



}