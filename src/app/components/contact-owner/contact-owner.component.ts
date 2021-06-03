import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-contact-owner',
  templateUrl: './contact-owner.component.html',
  styleUrls: ['./contact-owner.component.css']
})
export class ContactOwnerComponent implements OnInit {

  constructor(public dialog: MatDialog,private dateAdapter: DateAdapter<any>) { 
    this.dateAdapter.setLocale('en-US');
  }
   name="";
   mail ="";
   mobile ="";
   visitingDate:Date;
  ngOnInit(): void {
  }
  closeDialog(): void {
    
    console.log(this.visitingDate)
    this.dialog.closeAll();
  }
  submit(){

  }

}
