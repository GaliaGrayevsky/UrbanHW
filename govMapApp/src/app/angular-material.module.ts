import { NgModule } from '@angular/core';

//Organizing module for all the angular material imports that are used in the current app
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

const MODULES = [
  MatSliderModule,
  MatButtonToggleModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule
]

@NgModule({
  declarations: [],
  exports: MODULES
})
export class AngularMaterialModule { }
