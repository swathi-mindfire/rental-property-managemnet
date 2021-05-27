import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  form: FormGroup;
  images = [];
	imageSrc: string;
 

  constructor(private router:Router,private formBuilder: FormBuilder) { }

  addForm = new FormGroup({
		image: new FormControl('', Validators.required),
		imageSrc: new FormControl('', Validators.required)
	});
   
	get f(){
	  return this.addForm.controls;
	}
  
	onFileChange(event) {
		if(event.target.files && event.target.files[0]) {
			var fileCount = event.target.files.length;
			for (let i = 0; i < fileCount; i++) {
				var reader = new FileReader();
   
				reader.onload = (event:any) => {
				   this.images.push(event.target.result); 	   
				   this.addForm.patchValue({
					  imageSrc: this.images
				   });
           console.log(this.images)
				}
  
				reader.readAsDataURL(event.target.files[i]);
			}

		}
	}
  onSubmit(){
		// console.log(this.addForm.value);
		 console.log(this.imageSrc);
     console.log(this.images)
     console.log(this.addForm.controls.image)
	}




  ngOnInit(): void {
   
    
   
  }
  

}





