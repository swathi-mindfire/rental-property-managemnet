import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signedin= false;
  
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onlogout(){

    this.router.navigate(['login']);
 
    return false;
  }
  
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
 

}
