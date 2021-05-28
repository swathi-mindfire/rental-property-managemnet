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

  constructor(private ps: PropertyService) { 
    this.ps.selectedProperty.subscribe(
      (res)=>{
        this.selectedProperty=res;
        console.log(this.selectedProperty.imgUrls[0])

      }
    )
  }
 

  ngOnInit(): void {
  
  }

}
