import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  selectedProperty:any;
  images=[];
  imgs=[]

  constructor(private ps: PropertyService) { 
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
 

  ngOnInit(): void {
  
  }

}
