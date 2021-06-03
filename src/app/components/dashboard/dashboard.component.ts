import { Component, OnInit,OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import{MatSort} from '@angular/material/sort' 



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  obs: Observable<any>;
  id :string;
  clicked:boolean= false
  error: boolean = false;
  properties:[];
  pendingProperties :any;
  verifiedProperties:any;
  rentedProperties :any;
  vacantProperties :any;
  dataSource = new MatTableDataSource([]); 
  displayedColumns = ['id', 'location', 'rent', 'state'];
  constructor(private _ps: PropertyService,private route :ActivatedRoute,private changeDetectorRef: ChangeDetectorRef) { 
    this._ps.fetechedOwnerProperties.subscribe(
      (data)=>{
        if(data.fetched==true){
          this._ps.getOwnerProperties().subscribe((properties)=>{
            this.properties= properties;
            console.log(this.properties)
            this.dataSource = new MatTableDataSource(this.rentedProperties);
            this.dataSource.paginator = this.paginator;
            this.obs = this.dataSource.connect();
            this.pendingProperties = this.properties.filter(p => p["verified"]=="no");
            this.verifiedProperties =  this.properties.filter(p => p["verified"]=="yes");
            this.rentedProperties =  this.properties.filter(p => p["status"]=="rented");
            this.vacantProperties =  this.properties.filter(p => p["status"]=="vacant")
            this.error= null;         
          })
        }
      }
    )
    this._ps.propertiesGetError.subscribe(
      (data)=>{
        if(data.error== true){
          this.error= true;
        }
      }
    )    
  }
  

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges(); 
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  getProperties(){
    console.log(this.properties)

  }
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  showPendingProp(){
    this.dataSource = new MatTableDataSource(this.pendingProperties);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.clicked = true;
  }
  showVerifiedProp(){
    this.dataSource = new MatTableDataSource(this.verifiedProperties);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
  showRentedProp(){
    this.dataSource = new MatTableDataSource(this.rentedProperties);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
  showVacantProp(){
    this.dataSource = new MatTableDataSource(this.vacantProperties);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

}
