import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable,of } from 'rxjs';
import{Property} from 'src/app/model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private url = environment.api_url;
  properties:Property[];
	Locations=[];
	locations=[];
	s;
  error=null;
  fetechedProperties= new BehaviorSubject({fetched:false});
  propertiesGetError= new BehaviorSubject({error:false})
  constructor(private _http: HttpService) {
    this.fetchProperties().subscribe(
      (data)=>{
        this.properties=data;
        for (var property of this.properties) {
          this.Locations.push(property.location);
        }
        this.s= new Set(this.Locations);
        this.locations= [...this.s]
        this.error= null;
        this.fetechedProperties.next({fetched:true});
        this.propertiesGetError.next({error:false});
        
      },
      (err) =>{
        this.fetechedProperties.next({fetched:false});
        this.propertiesGetError.next({error:true})
        
      }
    )

   }

  fetchProperties():Observable<any>{  
    return this._http.GET(`${this.url}/properties`);  
    }
  getAllProperties(){
    return of(this.properties);
    
  }
  getLocations(){
    return this.locations;
    
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
