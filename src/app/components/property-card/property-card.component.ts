import { Component, OnInit,Input } from '@angular/core';
import{Property} from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  @Input() property: any;

  constructor(private ps: PropertyService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.ps.selectedProperty.subscribe()
   
  }
  hadlePropertyClick(){
    this.ps.selectedProperty.next(this.property);
    // this.router.navigate(["/propertydetails",{id:this.property.id}])
    // this.router.navigate(["/propertydetails"],{queryParams:{id:this.property.id}})
    this.router.navigate(["/propertydetails",this.property.id])
  
 }

}
