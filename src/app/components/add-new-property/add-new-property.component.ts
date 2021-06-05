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
    this._ps.handleNewAndEditProperty.next({new:true})
    const dialogRef = this.dialog.open(PropertyFormComponent,{
      width: '650px',disableClose: true ,
    })
    // const dialogRef = this.dialog.open(PropertyFormComponent,{
    //   width: '500px',disableClose: true 
    // });
  }

  uploadFile(event){
    let ele = event.target;
    if(ele.files.length>0){
      let formData =  new FormData();
      formData.append('image',ele.files[0])     
      this._http.post('http://localhost:9000/newpropdoc',formData).subscribe(
        (data)=>{
          console.log(data)
          console.log("Uploaded")
        },
        (err)=>{console.log("Error")

        console.log(err)

        }
      )
    }
  }

}
