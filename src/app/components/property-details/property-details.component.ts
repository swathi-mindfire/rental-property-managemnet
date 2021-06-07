import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
import {MatDialog} from '@angular/material/dialog';
import { ContactOwnerComponent } from '../contact-owner/contact-owner.component';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
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
 
  ngOnInit(): void {
  
  }

}
