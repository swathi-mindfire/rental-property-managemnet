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
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog'





const MaterialComponents = [
                            MatButtonModule,
                            MatSidenavModule,
                            MatPaginatorModule,
                            MatListModule,
                            MatProgressSpinnerModule,
                            MatButtonToggleModule,
                            MatIconModule,
                            MatDialogModule,
                            MatBadgeModule,
                            MatGridListModule,
                            MatCardModule,
                            MatInputModule,
                            MatToolbarModule,
                            MatAutocompleteModule,
                            MatSelectModule,
                            NgMatSearchBarModule,
                            MatSortModule,
                            MatRadioModule
                          
                          ]

@NgModule({

  imports: [MaterialComponents],
  exports :[MaterialComponents],
})
export class MaterialModule { }
