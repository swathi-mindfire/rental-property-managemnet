import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpClient) { }
  
authenticate(data):Observable<any>{
  return this._http.post('localhost:9000/users/login',data);
}
}



