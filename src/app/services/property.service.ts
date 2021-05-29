import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import{Property} from 'src/app/model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private url = environment.api_url;

  constructor(private _http: HttpService) { }

  getProperties(params?):Observable<any>{
    if(params){
      return this._http.GET(`${this.url}/properties`,params);
    }
    return this._http.GET(`${this.url}/properties`);
    
   
    }
  selectedProperty = new BehaviorSubject<Property>({
    
      id:null,
      ownerId:null,
      rent:null,
      type:null,
      bhk:null,
      location:null,
      country:null,
      state:null,
      address:null,
      zipcode:null,
      imgUrls:[],
      status:null
  })
  searchFilters={}
  propertySearchFilters= new BehaviorSubject(this.searchFilters)
}
