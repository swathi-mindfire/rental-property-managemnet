import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  
  propertyForm: FormGroup;
  updatePropertyDetails:any

  constructor(private _ps: PropertyService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._ps.handleNewAndEditProperty.subscribe(
      (info)=>{
      if(info.new==true) this.buildPropertyForm()
      else this.editPropertyForm()

      }

    )
  }
  private buildPropertyForm(): void {
    this.propertyForm = this.formBuilder.group({
      propertyType: ['', [Validators.required]],
      rent: ['', [Validators.required]],
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      location: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(40)]],
      address: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50) ] ],
      zipcode: ['', [Validators.required, Validators.minLength(6) ] ],     
      bhk: ['', Validators.pattern('[1-9]') ],
      area: ['',Validators.pattern('[0-9.]{1,4}')],
      baths: ['',Validators.required],
      parking : ['',Validators.required],
      gym : ['',Validators.required],
      pool : ['',Validators.required],
      status: ['',Validators.required],
      document: ['',Validators.required]
    });
  }

  private editPropertyForm(): void {
    this._ps.editPropertyDetails.subscribe(property => {
      this.updatePropertyDetails = property;
    });
    this.propertyForm = this.formBuilder.group({
      propertyType: [this.updatePropertyDetails.type, [Validators.required]],
      rent: [this.updatePropertyDetails.rent, [Validators.required]],
      country: [this.updatePropertyDetails.country,[Validators.required]],
      state: [this.updatePropertyDetails.state,[Validators.required]],
      location: [this.updatePropertyDetails.location,[Validators.required,Validators.minLength(2), Validators.maxLength(40)]],
      address: [this.updatePropertyDetails.address, [Validators.required, Validators.minLength(2), Validators.maxLength(50) ] ],
      zipcode: [this.updatePropertyDetails.zipcode, [Validators.required, Validators.minLength(6) ] ],     
      bhk: [this.updatePropertyDetails.flat,  Validators.pattern('[1-9]') ],
      area: [this.updatePropertyDetails.area, Validators.pattern('[0-9.]{1,4}')],
      baths: [this.updatePropertyDetails.baths,Validators.required],
      parking : [this.updatePropertyDetails.parking,Validators.required],
      gym : [this.updatePropertyDetails.gym,Validators.required],
      pool : [this.updatePropertyDetails.pool,Validators.required],
      status: [this.updatePropertyDetails.status,Validators.required],
      document: [this.updatePropertyDetails.documentUrl,Validators.required]
    });
  }



}
