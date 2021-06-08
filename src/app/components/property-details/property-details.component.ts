import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
import {MatDialog} from '@angular/material/dialog';
import { ContactOwnerComponent } from '../contact-owner/contact-owner.component';
import { PropertyFormComponent } from '../property-form/property-form.component';


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

  constructor(private _ps: PropertyService,public dialog: MatDialog) {
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
    this._ps.handleNewAndEditProperty.next({new:true})
    const dialogRef2 = this.dialog.open(PropertyFormComponent,{
      width: '650px',disableClose: true ,
      data:{property:this.selectedProperty,images:this.imgs}
    })
  }

  

}
