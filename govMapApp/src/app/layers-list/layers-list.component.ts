import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStateManagerService } from '../core/data-state-manager.service';
import { ILayerData } from '../core/models';

@Component({
  selector: 'app-layers-list',
  templateUrl: './layers-list.component.html',
  styleUrls: ['./layers-list.component.scss']
})
export class LayerslistComponent implements OnInit, OnDestroy {

  @Input() layers: ILayerData[] = [];
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  subscription: Subscription = new Subscription();

  constructor(private dataStateManagerService: DataStateManagerService) { }

  ngOnInit(): void {
    this.subscription = this.dataStateManagerService.getLayers().subscribe(
      (layers: ILayerData[]) => this.layers = layers
    );
  }

  emitClose() {
    this.close.emit(true);
  }

  toggleLayer(l: ILayerData) {
    console.log(l);
    l.selected = !l.selected;
    this.dataStateManagerService.updateLayerState(l);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
