import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  selectedProperty:any;
  images=[];
  imgs=[]

  constructor(private ps: PropertyService,public dialog: MatDialog) { 
    this.ps.selectedProperty.subscribe(
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
    const dialogRef = this.dialog.open(LoginComponent,{
      width: '640px',disableClose: true 
    });
  }
 

  ngOnInit(): void {
  
  }

}
