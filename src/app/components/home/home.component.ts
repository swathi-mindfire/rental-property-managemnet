import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  properties:Property[];
	Locations=[];
	locations=[];
	s;
	error:string=null;

	
    constructor(private _ps: PropertyService) { }	
	ngOnInit(): void {
   
    this._ps.propertySearchFilters.subscribe(
      (data)=>{
        if(Object.keys(data).length>0){
          this.getProperties(data)

        }
        else{
          this._ps.searchFilters={};
          this.getProperties()
        }
      }
    )
    this._ps.propertySearchFilters.next({})
		
	}
  getProperties(params?){
		if(params){
			this._ps.getProperties(params).subscribe(
				(res)=>{
					this.properties=res;
					this.error= null;
					},
				(err)=>{
					this.error= err.message;
					this.properties= [];
				}
			)

		}
		else{
			this._ps.getProperties().subscribe(
				(res)=>{
					this.properties=res;
					for (var property of this.properties) {
						this.Locations.push(property.location);
					}
					this.s= new Set(this.Locations);
					this.locations= [...this.s]
					this.error= null;
					},
				(err)=>{
					this.error= err.message;
					this.properties= [];
				}
			)

		}
		
	}
  
	
}





