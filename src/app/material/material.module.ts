import { NgModule } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import{MatCardModule} from '@angular/material/card';
import{MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import{MatProgressSpinnerModule} from'@angular/material/progress-spinner';


const MaterialComponents = [
                            MatButtonModule,
                            MatSidenavModule,
                            MatListModule,
                            MatProgressSpinnerModule,
                            MatButtonToggleModule,
                            MatIconModule,
                            MatBadgeModule,
                            MatGridListModule,
                            MatCardModule,
                            MatInputModule,
                            MatToolbarModule,
                            MatAutocompleteModule,
                            MatSelectModule,
                            NgMatSearchBarModule
                          
                          ]

@NgModule({

  imports: [MaterialComponents],
  exports :[MaterialComponents],
})
export class MaterialModule { }
