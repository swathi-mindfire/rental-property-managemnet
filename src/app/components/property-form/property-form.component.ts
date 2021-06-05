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
  urls = [];

  constructor(private _ps: PropertyService, private fb: FormBuilder ) { 
    
  this.createForm();
  }

  ngOnInit(): void {
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
      location: ['',[Validators.required,Validators.pattern('[A-Za-z]{2,30}')]],
      address: ['', [Validators.required, Validators.pattern('[0-9.a-zA-Z]{1,40}')]],
      zipcode: ['', [Validators.required,Validators.pattern('[0-9]{6,8}')] ],     
   
    });
    this.formFeaturesGroup  = this.fb.group({
      parking : [false],
      gym : [false],
      pool : [false],
    });
    this.formMediaGroup  = this.fb.group({
      image: ['', Validators.required],
      documnet : ['', Validators.required],
    });
    }

  handle(){
    console.log(this.formBasicGroup.value)
  }

  next2(){
    console.log(this.formAddressGroup.value)
    console.log(this.formAddressGroup.valid)
  }
  next3(){
    console.log(this.formFeaturesGroup)
    console.log(this.formFeaturesGroup.value)
    console.log(this.formFeaturesGroup.valid)
  }
  loadStates(){
    let selected  =countryList.filter(c=> c.country===this.formAddressGroup.value.country);
    this.states=[];
    if(this.formAddressGroup.value.country!=""){
      for (var s of selected[0].states) {
        this.states.push(s);
      }
    }
  }
 
  onSelectFile(event) {
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      console.log(this.formMediaGroup.controls.image)
        var filesLength = event.target.files.length;
        console.log(filesLength)
        for (let i = 0; i < filesLength; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                   this.urls.push(event.target.result);
                   console.log(event.target.result) 
                   
                }
                console.log(event.target.files[i])
              reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  deleteImg(i){
    this.urls.splice(i,1)
  }
  deleteAllImgs(){
    this.urls= []
  }

}
