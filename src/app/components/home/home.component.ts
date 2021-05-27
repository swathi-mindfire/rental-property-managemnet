import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	properties:Property[];
 
 constructor(private _http: PropertyService) { }


	
  ngOnInit(): void {
	  this._http.getProperties().subscribe(
		  (res)=>{
			  console.log(res)
			 this.properties=res
			},
		  (err)=>{console.log(err)}
	  )

   
    
   
  }
  

}





