import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-property',
  templateUrl: './add-new-property.component.html',
  styleUrls: ['./add-new-property.component.css']
})
export class AddNewPropertyComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  uploadFile(event){
    let ele = event.target;
    console.log(ele);
    console.log(ele.files[0]);
    if(ele.files.length>0){
      let formData =  new FormData();
      formData.append('image',ele.files[0])
      
      this.http.post('http://localhost:9000/newprop',formData).subscribe(
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
