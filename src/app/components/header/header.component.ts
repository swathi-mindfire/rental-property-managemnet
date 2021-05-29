import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signedin= false;
  
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router:Router,private _ps: PropertyService) { }

  ngOnInit(): void {
    this._ps.propertySearchFilters.subscribe();
  }
  onlogout(){

    this.router.navigate(['login']);
 
    return false;
  }
  
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
  handleHome(){
    this._ps.propertySearchFilters.next({});

  }

}
