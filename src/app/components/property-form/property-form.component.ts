import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{countryList} from '../../model/country-states';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';  
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
  uploads=[];
  docProof :null;
  documentErr=null;
  imagesErr= null;
  docAdded = false;
  propertyUploaded = false;
  owner_id = localStorage.getItem('id');
  propertyEditDetails;
  parking: boolean;
  gym :boolean;
  pool:boolean;
  buttonName:string;
  notification:string;
  new:boolean= true;


  constructor(
              private _ps: PropertyService, 
              private fb: FormBuilder,
              public dialog: MatDialog,
              private snackbar:MatSnackBar,
              private  dialogref: MatDialogRef<PropertyFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data :any
              ) { 
                if(data.property!= null){
                  this.new = false;
                this.propertyEditDetails = data;
              
                }
                else this.new = true;
                this._ps.handleNewAndEditProperty.subscribe((res)=>{
                  this.buttonName= "submit";
                  this.notification = "Your Property Uploaded sucessfully";
                  if(res.new == true) this.createForm()
                  else 
                  { 
                    this.urls = this.propertyEditDetails.images;
                    this.uploads = this.propertyEditDetails.images;
                    if(this.propertyEditDetails.property["parking"]== "yes") this.parking = true
                    else this.parking = false;
                    if(this.propertyEditDetails.property["gym"]== "yes") this.gym = true
                    else this.gym = false;
                    if(this.propertyEditDetails.property["pool"]== "yes") this.pool = true
                    else this.pool = false;
                    this.states = [this.propertyEditDetails.property['state']];
                    this.BHKS = [this.propertyEditDetails.property['bhk']];
                    
                    this.docProof= this.propertyEditDetails.property["document-path"];
                    this.documentErr= false;
                    this.buttonName= "Update";
                    this.notification = "Property Details Changed Sucessfully";
                    this.editForm();
                  }
                })
  }

  ngOnInit(): void {
    for (var cl of countryList) {
      this.countries.push(cl.country);
    }
    this._ps.propertyUploadSuccess.subscribe();
  }
  createForm() {
    this.formBasicGroup  = this.fb.group({
      type: ['', [Validators.required]],
      rent: ['', [Validators.required,Validators.pattern('[0-9]*')]],
      bhk: ['' ,Validators.required ],
      area: ['',[Validators.required,Validators.pattern('[0-9.]{1,5}')]],
      status: ['vacant',Validators.required],
      baths: ['',[Validators.required,Validators.pattern('[0-9]{1,5}')]],
    });  
    this.formAddressGroup  = this.fb.group({
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      location: ['',[Validators.required,Validators.pattern('[A-Za-z]{2,30}')]],
      address: ['', [Validators.required]],
      zipcode: ['', [Validators.required,Validators.pattern('[0-9]{6,8}')] ],       
    });
    this.formFeaturesGroup  = this.fb.group({
      parking : [false],
      gym : [false],
      pool : [false],
    });
    this.formMediaGroup  = this.fb.group({
      image: ['', Validators.required],
      document : ['', Validators.required],
    });
  }
  editForm() {
    this.formBasicGroup  = this.fb.group({
      type: [this.propertyEditDetails.property['type'], [Validators.required]],
      rent: [this.propertyEditDetails.property['rent'], [Validators.required,Validators.pattern('[0-9]*')]],
      bhk: [this.propertyEditDetails.property['bhk'],Validators.required ],
      area: [this.propertyEditDetails.property['area'],[Validators.required,Validators.pattern('[0-9.]{1,5}')]],
      status: [this.propertyEditDetails.property['status'],Validators.required],
      baths: [this.propertyEditDetails.property['baths'],[Validators.required,Validators.pattern('[0-9]{1,5}')]],
    });  
    this.formAddressGroup  = this.fb.group({
      country: [this.propertyEditDetails.property['country'],[Validators.required]],
      state: [this.propertyEditDetails.property['state'],[Validators.required]],
      location: [this.propertyEditDetails.property['location'],[Validators.required,Validators.pattern('[A-Za-z]{2,30}')]],
      address: [this.propertyEditDetails.property['address'], [Validators.required]],
      zipcode: [this.propertyEditDetails.property['zipcode'], [Validators.required,Validators.pattern('[0-9]{6,8}')] ],       
    });
    this.formFeaturesGroup  = this.fb.group({
      parking : [this.parking],
      gym : [this.pool],
      pool : [this.pool],
    });
    this.formMediaGroup  = this.fb.group({
      image: ['', Validators.required],
      

    });
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
  loadBhks(){
    this.BHKS= [1,2,3,4,5];

  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesLength = event.target.files.length;
        for (let i = 0; i < filesLength; i++) {
          this.uploads.push(event.target.files[i])
                var reader = new FileReader();
                reader.onload = (event:any) => {
                   this.urls.push(event.target.result);
                  }
          reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  onSelectDoc(event) {
    if (event.target.files && event.target.files[0]) {
      this.docProof= event.target.files[0];
      this.documentErr= false;
      this.docAdded = true;
    }
  }

  deleteImg(i){
    this.urls.splice(i,1)
  }
  deleteAllImgs(){
    this.urls= []
  }
  handlePropertyUpload(){
    if(!this.uploads) this.imagesErr= true;else this.imagesErr = false;
    if(!this.docProof)  this.documentErr = true;else  this.documentErr = false;
    if(this.formBasicGroup.valid
      && this.formAddressGroup.valid 
      &&this.formFeaturesGroup.valid
      && !this.documentErr
      && !this.imagesErr
    ){
      let propertyDetails = new FormData();
      Object.keys(this.formBasicGroup.controls).forEach(key => {
        propertyDetails.append(key,this.formBasicGroup.get(key).value) 
      });
      Object.keys(this.formAddressGroup.controls).forEach(key => {
        propertyDetails.append(key,this.formAddressGroup.get(key).value) 
      });
      Object.keys(this.formFeaturesGroup.controls).forEach(key => {
        let value =""
        if(this.formFeaturesGroup.get(key).value == true)
          value = "yes";
        else value = "no";
        propertyDetails.append(key,value) 
      });
      // for(let i in this.uploads){
      //   propertyDetails.append(i,this.uploads[i]);
      // }
      if(this.new){
        propertyDetails.append('doc',this.docProof)
        propertyDetails.append('owner-id',this.owner_id);
      }
      else propertyDetails.append('property-id',this.propertyEditDetails.property.id)  
    

      if(this.data.property == null){
        
        this._ps.addNewProperty(propertyDetails).subscribe(
          (data)=>{
            console.log(data)
            this.handleUploadStatus();
      
          },
          (err)=>{
            this.propertyUploaded = false;
           }
        )
      }
      else{
        let  p_id = this.propertyEditDetails.property.id;
        this._ps.editProperty(propertyDetails).subscribe(
          (data)=>{
            this.handleUploadStatus();      
          },
          (err)=>{
            this.propertyUploaded = false;
           }
        )
      }       
    }
  else return;  
  }
  handleUploadStatus(){
    this.formBasicGroup.reset();
    this.formAddressGroup.reset();
    this.formFeaturesGroup.reset();
    this.formMediaGroup.reset();
    setTimeout(() => {this.dialog.closeAll()
        
    }, 4000);    
    let sb=  this.snackbar.open(this.notification,"close",{
      duration : 4000,
      panelClass: ['snackbar-style']
      });
      sb.onAction().subscribe(()=>{
        this.dialog.closeAll();
        sb.dismiss();

      })
      sb.afterDismissed().subscribe(()=>{
        this.dialog.closeAll();
      })
  }
}
