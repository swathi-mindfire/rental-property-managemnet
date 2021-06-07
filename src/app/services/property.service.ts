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
  allProperties:Property[];
  ownerProperties:any;
	Locations=[];
	locations=[];
	s;
  error=null;
  ownerPropErr = null;
  fetechedProperties= new BehaviorSubject({fetched:false});
  propertiesGetError= new BehaviorSubject({error:false});
  fetechedOwnerProperties= new BehaviorSubject({fetched:false});
  ownerPropertiesGetError= new BehaviorSubject({error:false});
  handleNewAndEditProperty= new BehaviorSubject({new:true});
  editPropertyDetails = new BehaviorSubject({});
  propertyUploadSuccess = new BehaviorSubject({uploaded:false})
  constructor(private _http: HttpService) {
    this.fetchProperties().subscribe(
      (data)=>{
        this.allProperties=data;
        for (var property of this.allProperties) {
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
  fetchOwnerproperties(id){
    // let params = new HttpParams();
    //  params = params.append('id', id);
    // let params= {id: id};
    this._http.GET(`${this.url}/owner/properties/${id}`).subscribe(
      (res)=>{
            this.ownerProperties=res;
            this.ownerPropErr= null;
            this.fetechedOwnerProperties.next({fetched:true});
            this.ownerPropertiesGetError.next({error:false});        
          },
          (err) =>{
            
            this.fetechedOwnerProperties.next({fetched:false});
            this.ownerPropertiesGetError.next({error:true})      
          }
        )
  }
  addNewProperty(propertyDetails){
    return this._http.postProperty(`${this.url}/properties`,propertyDetails)
  }
  fetchProperties():Observable<any>{  
    return this._http.GET(`${this.url}/properties`);  
    }
  getAllProperties(){
    return of(this.allProperties);
    
  }
  getOwnerProperties(){
    return of(this.ownerProperties);    
  }
  getLocations(){
    return this.locations;
    
  }
  addUserContactInfo(userInfo){
    return this._http.POST(`${this.url}/usercontacts`,userInfo)
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
      status:null,
      baths:null,
      gym:null,
      area:null,
      pool:null,
      parking:null,
  })
  ownerPropClick = new BehaviorSubject({ownerProp:false})
  searchFilters={}
  propertySearchFilters= new BehaviorSubject(this.searchFilters)
}
