import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
Validators

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent implements OnInit {
  tenantForm :FormGroup;
  properties = [];
  error:boolean =null;
  availableProperties =[];
  pIds =[];

  constructor(private _fb:FormBuilder,private _ps:PropertyService) {
    this._ps.fetechedOwnerProperties.subscribe(
      (data)=>{
        if(data.fetched==true){
          this._ps.getOwnerProperties().subscribe((properties)=>{
            this.properties= properties;
            this.availableProperties =  this.properties.filter(p => p["verified"]=="yes" &&  p["status"]=="vacant");
            this.availableProperties.forEach(property => {
            this.pIds.push(property.id)              
            });
            this.error= null;         
          })
        }
      }
    )
    this._ps.ownerPropertiesGetError.subscribe(
      (data)=>{
        if(data.error== true){
          this.error= true;
        }
      }
    )
    
   }

  ngOnInit(): void {
    this.tenantForm  = this._fb.group({
      propertyId: ['', [Validators.required]],
      name: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,15}')]],
      mobile: ['' ,[Validators.required,Validators.pattern('[6-9][0-9]{9}')] ],
      email: ['',[Validators.email,Validators.required]],
    }); 
  }

}
