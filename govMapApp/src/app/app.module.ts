import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

import { MapContainerComponent } from './map-container/map-container.component';
import { LayersMenuComponent } from './layers-menu/layers-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { LayerslistComponent } from './layers-list/layers-list.component';

const MODULES = [
  BrowserModule,
  FormsModule,
  AngularMaterialModule,
  HttpClientModule,
  CoreModule
]

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    LayersMenuComponent,
    LayerslistComponent
  ],
  imports: MODULES,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
