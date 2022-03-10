import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStateManagerService } from './data-state-manager.service';
import { GovMapCommunicatorService } from './gov-map-communicator.service';

const PROVIDERS = [
  DataStateManagerService,
  GovMapCommunicatorService
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: PROVIDERS
})
export class CoreModule { }
