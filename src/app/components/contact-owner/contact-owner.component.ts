import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-owner',
  templateUrl: './contact-owner.component.html',
  styleUrls: ['./contact-owner.component.css']
})
export class ContactOwnerComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
   name="";
   mail ="";
   mobile ="";
  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
  submit(){

  }

}
