import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from 'src/app/services/property.service';
import { PropertyFormComponent } from '../property-form/property-form.component';

@Component({
  selector: 'app-add-new-property',
  templateUrl: './add-new-property.component.html',
  styleUrls: ['./add-new-property.component.css']
})
export class AddNewPropertyComponent implements OnInit {

  constructor(private _http : HttpClient,public dialog: MatDialog,private _ps: PropertyService) { }

  ngOnInit(): void {
    
  }

  openDialog(){
    this._ps.handleNewAndEditProperty.next({new:true})
    const dialogRef = this.dialog.open(PropertyFormComponent,{
      width: '650px',disableClose: true ,
    })
  }
}
