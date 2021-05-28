import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
import { FormControl } from '@angular/forms';
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
	error:string=null;;
	searchPlaceHolder = "Search by Location";
	typePlaceHolder = "Property Type";
	propertyTypes= ["Villa","House","Flat"];
	maxBudgetPlaceHolder = "Max Budget";
	minBudgetPlaceHolder = "Min Budget"
    constructor(private _http: PropertyService) { }	
	ngOnInit(): void {
		this.getProperties()
	}
	searchLocation = new FormControl();
	searchType = new FormControl();
	minrent = new FormControl();
	maxrent = new FormControl();
	params={};
	checkPlaceHolder() {
		if (this.searchPlaceHolder || this.searchLocation.value != null) {
		    this.searchPlaceHolder = null;
	
		return;
		} else {
			this.searchPlaceHolder ='Search by Location';
		return
		}
	}
	pTypePlaceHolder() {
		if (this.typePlaceHolder  || this.searchType.value != null) {
		this.typePlaceHolder = null;
		return;
		} else {
		this.typePlaceHolder = 'Property Type'
		return
		}
	}
	pminBudgetPlaceHolder() {
		if (this.minBudgetPlaceHolder==null ||this.minrent.value == null || this.minrent.value=="") {
		this.minBudgetPlaceHolder = 'Min Budget';
		return;
		} else {
			this.minBudgetPlaceHolder = null;
		return
		}
	}
	pmaxBudgetPlaceHolder() {
		if (this.maxBudgetPlaceHolder==null||this.maxrent.value == null||this.maxrent.value=="") {
		    this.maxBudgetPlaceHolder = 'Max Budget';
		    return;
		} else {
			this.maxBudgetPlaceHolder = null;
			return
		}
	}
	handleSearch(){
		if(this.searchLocation.value!=null){
			this.params["location"]= this.searchLocation.value;
		}
		if(this.searchType.value!= null){
			this.params["type"] = this.searchType.value
		}
		if(this.minrent.value!= null|| this.minrent.value>0){
			this.params["minrent"] = this.minrent.value;
		}
		if(this.maxrent.value!= null|| this.maxrent.value>0){
			this.params["maxrent"] = this.maxrent.value;
		}
		if(this.params){
			this.getProperties(this.params)
		}
		
	}
	getProperties(params?){
		if(params){
			this._http.getProperties(params).subscribe(
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
			this._http.getProperties().subscribe(
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





