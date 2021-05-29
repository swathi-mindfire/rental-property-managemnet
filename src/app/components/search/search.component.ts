import { Component, OnInit,Input } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	@Input() locations:[];
  searchPlaceHolder = "Search by Location";
	typePlaceHolder = "Property Type";
	propertyTypes= ["Villa","House","Flat"];
	maxBudgetPlaceHolder = "Max Budget";
	minBudgetPlaceHolder = "Min Budget";

  constructor(private _ps: PropertyService) { }

  ngOnInit(): void {
    this._ps.propertySearchFilters.subscribe()
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
		this._ps.searchFilters=this.params;
		

		if(this._ps.searchFilters){
			// this.getProperties(this.params);
           this._ps.propertySearchFilters.next(this._ps.searchFilters);
		}
		
	}
	

}
