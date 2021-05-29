import { Component, OnInit,Input} from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
	@Input() properties:Property[];
	error:string=null;

  constructor(private _ps: PropertyService) { }

  ngOnInit(): void {
    

  }
 

}
