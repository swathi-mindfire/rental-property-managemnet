import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private url = environment.api_url;

  constructor(private _http: HttpService) { }

  getProperties():Observable<any>{
    
    return this._http.GET(`${this.url}/properties`);
    }
}
