import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
import {MatDialog} from '@angular/material/dialog';
import { ContactOwnerComponent } from '../contact-owner/contact-owner.component';
import { PropertyFormComponent } from '../property-form/property-form.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent {
  selectedProperty:any;
  images=[];
  imgs=[];
  ownerProp:boolean = false;
  role:string = null;
  private url= environment.api_url;

  constructor(private _ps: PropertyService,public dialog: MatDialog,
    private _http: HttpClient, private snackbar:MatSnackBar,private router :Router,) {
    this.role = localStorage.getItem('role')
    this._ps.ownerPropClick.subscribe(
      (data)=>{

        if(data.ownerProp == true) this.ownerProp = true
        else this.ownerProp = false;
      })
    this._ps.selectedProperty.subscribe(
      (res)=>{
        this.selectedProperty=res;
        this.imgs= this.selectedProperty.imgUrls;
        for(var url of this.imgs){
          this.images.push({path:url})

        }
      }
    )
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ContactOwnerComponent,{
      width: '400px',disableClose: true,
      data:{property_id:this.selectedProperty.id}
    });
  }
 
  openEditForm(){
    this._ps.handleNewAndEditProperty.next({new:false})
    const dialogRef2 = this.dialog.open(PropertyFormComponent,{
      width: '650px',disableClose: true ,
      data:{property:this.selectedProperty,images:this.imgs}
    })
  }

  verify(){
    this._http.post(`${this.url}/verifyproperty/${this.selectedProperty.id}`,"yes",{responseType: 'text'}).subscribe(
      (data)=>{
        let sb=  this.snackbar.open("Verified Succesfully","close",{
          duration : 4000,
          panelClass: ['snackbar-style']
          });
          sb.onAction().subscribe(()=>{
            this.router.navigate(['/admin']);  

            sb.dismiss();
    
          })
          sb.afterDismissed().subscribe(()=>{
            this.router.navigate(['/admin']);  
          })

      }
    );

  }

  

}
