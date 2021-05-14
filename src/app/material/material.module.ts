import { NgModule } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import{MatCardModule} from '@angular/material/card';
import{MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'







const MaterialComponents = [
                            MatButtonModule,
                            MatButtonToggleModule,
                            MatIconModule,
                            MatBadgeModule,
                            MatGridListModule,
                            MatCardModule,
                            MatInputModule,
                            MatToolbarModule
                          
                          ]

@NgModule({

  imports: [MaterialComponents],
  exports :[MaterialComponents],
})
export class MaterialModule { }
