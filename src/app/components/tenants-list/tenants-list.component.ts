import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.css']
})
export class TenantsListComponent implements OnInit {

  verifiedPropIds=[];
  vacantPropeIds=[];

  error :boolean = null;
  tenantsList = [];

  constructor(private _ps:PropertyService) { 
    this._ps.fetchedTenantsList.subscribe(
      (data)=>{
        if(data.fetched==true){
          this.vacantPropeIds = this._ps.vacantPropIds;
          this.verifiedPropIds= this._ps.verifiedPropIds;
          this.tenantsList = _ps.tenantsList;
          console.log(this.tenantsList)
 
        }
        else this.tenantsList = [];
      })
      this._ps.propertiesGetError.subscribe(
        (data)=>{
          if(data.error== true){
            this.error= true;
          }
        }
      )
    }
         

  ngOnInit(): void {
  }

}
