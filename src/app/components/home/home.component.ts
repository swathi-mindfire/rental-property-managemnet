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
	locations=[];
	searchPlaceHolder = "Search by location";
	typePlaceHolder = "Property Type";
	propertyTypes= ["Villa","House","Flat"];
    constructor(private _http: PropertyService) { }	
	ngOnInit(): void {
		this._http.getProperties().subscribe(
			(res)=>{
				this.properties=res;
				for (var property of this.properties) {
					this.locations.push(property.location);
			}
				},
			(err)=>{console.log(err)}
		)
	}
	searchLocation = new FormControl();
	searchType = new FormControl();
	checkPlaceHolder() {
		if ( this.searchLocation.value == null) {
		    this.searchPlaceHolder = 'Search by location';
	
		return;
		} else {
			this.searchPlaceHolder = null;
		return
		}
	}
	pTypePlaceHolder() {
		if (this.searchType.status=="VALID") {
		this.typePlaceHolder = null;
		return;
		} else {
		this.typePlaceHolder = 'Property Type'
		return
		}
	}
}





