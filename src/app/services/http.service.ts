import { HttpClient ,HttpHeaders,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _httpOptionsForPost = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
}

  constructor(private _http:HttpClient) { }

POST(path: string, body: HttpParams = null, options?: any): Observable<Object> {
  return this._http.post(path, body, this._httpOptionsForPost)
      
}

getContactRequests(path,id){
  return this._http.get(path)
}
// GET(path: string,qparams?): Observable<Object> {
//   if(qparams){

//     return this._http.post(path,qparams);
//   }
//   // this.router.navigate(["/propertydetails"],)
//   return this._http.get(path);
  
      
// }
GET(path: string,qparams?): Observable<Object> {
  if(qparams)
  return this._http.get(path, {params: qparams});

  // this.router.navigate(["/propertydetails"],)
  else return this._http.get(path);
}

postProperty(path,propertyDetails){
   return this._http.post(path,propertyDetails,{responseType: 'text'})
}

}
