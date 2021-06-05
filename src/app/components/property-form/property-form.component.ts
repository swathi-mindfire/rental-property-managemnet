import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{countryList} from '../../model/country-states'
@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  
  propertyForm: FormGroup;
  updatePropertyDetails:any
  isLinear = true;
  country= countryList;
  formBasicGroup : FormGroup;
  formAddressGroup : FormGroup;
  formFeaturesGroup : FormGroup;
  formMediaGroup : FormGroup;
  states=[];
  propertyTypes= ["Villa","House","Apartment"];
  BHKS= [1,2,3,4,5];
  countries = [];

  constructor(private _ps: PropertyService, private fb: FormBuilder ) { 
    
  this.createForm();
  }

  ngOnInit(): void {
    // this.countries = countryList.map(function(c) {return c.country;});
    // console.log(this.countries)
    // console.log(typeof(this.countries))
    // this.countries = Object.keys(this.countries);
    // console.log(this.countries)
    // console.log(typeof(this.countries))
    for (var cl of countryList) {
      this.countries.push(cl.country);
    }
    this._ps.handleNewAndEditProperty.subscribe(
      (info)=>{
      if(info.new==true) this.buildPropertyForm()
      else this.editPropertyForm()

      }

    )
  }
  // createForm() {
  //   this.formNameGroup  = this.fb.group({
  //     userName: ['', Validators.required]
  //   });
  
  //   this.formPasswordGroup  = this.fb.group({
  //     passWord: ['', Validators.required]
  //   });
  //   this.formEmailGroup  = this.fb.group({
  //     emailID: ['', Validators.compose([Validators.required, Validators.email])]
  //   });
  //   this.formPhoneGroup  = this.fb.group({
  //     mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
  //   });
  //   }
  private buildPropertyForm(): void {
    this.propertyForm = this.fb.group({
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
    this.propertyForm = this.fb.group({
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
  createForm() {
    this.formBasicGroup  = this.fb.group({
      propertyType: ['', [Validators.required]],
      rent: ['', [Validators.required,Validators.pattern('[0-9]*')]],
      bhk: ['' ,Validators.required ],
      area: ['',[Validators.required,Validators.pattern('[0-9.]{1,5}')]],
      status: [false,Validators.required],
      baths: ['',[Validators.required,Validators.pattern('[0-9]{1,5}')]],
    });
  
    this.formAddressGroup  = this.fb.group({
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      location: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(40)]],
      address: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(50) ]],
      zipcode: ['', [Validators.required, Validators.minLength(6),Validators.pattern('[0-9]{6,}')] ],     
   
    });
    this.formFeaturesGroup  = this.fb.group({
      parking : ['',Validators.required],
      gym : ['',Validators.required],
      pool : ['',Validators.required],
    });
    this.formMediaGroup  = this.fb.group({
      image: ['', Validators.required],
      documnet : ['', Validators.required],
    });
    }

  handle(){
    console.log(this.formBasicGroup.value)
  }
  loadStates(){
    let selected  =countryList.filter(c=> c.country===this.formAddressGroup.value.country);
    this.states=[];
    console.log(selected)
    console.log(selected[0].states)
    for (var s of selected[0].states) {
      this.states.push(s);
    }

  }

}
