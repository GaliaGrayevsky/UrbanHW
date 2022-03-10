import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GovMapCommunicatorService } from './gov-map-communicator.service';
import { ILayerData, URL_MIDDLE, URL_PREFIX } from './models';

/**
 * Server that is used as a state manager
 */

@Injectable({
  providedIn: 'root'
})
export class DataStateManagerService 
{
  // Subject to hold list of layers and their details
  private _layers: BehaviorSubject<ILayerData[]> = new BehaviorSubject<ILayerData[]>([]);

  // Observable of the subject that components will subscribe to
  private _layers$: Observable<ILayerData[]> = this._layers.asObservable();

  // Overlay settings URL part
  private _changed: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private _changed$: Observable<string> = this._changed.asObservable();

  constructor(private govMapCommunicatorService: GovMapCommunicatorService) { }

  //returns the overlay tile url params, that inludes all selected layers details
  getChanged() : Observable<string> {
    return this._changed$;
  }

  getLayers() : Observable<ILayerData[]> {
    return this._layers$;
  }

  setLayers(): void {
    this.govMapCommunicatorService.getBasicLayers().subscribe(
      (layers: ILayerData[]) => {
        this._layers.next(layers);
      }
    );
  }

  //Updates the list of selected layes and generates the correct URL for the overlay. If nothing was added, but the map moved the url also generated to get the correct overlay url
  updateLayerState(l: ILayerData) : void {
    let newLayers: ILayerData[] = this._layers.getValue();
    
    let urlParams: string = URL_PREFIX;
    let urllMiddle: string = "";

    for(let el of newLayers){ 
      if (l?.layerID && el.layerID == l.layerID){
        el.selected = l.selected;
      }

      if (!!el.selected) {
        urlParams += `{"id":${+el.layerID + 1},"name":"${el.layerCaption}","source":{"type":"mapLayer","mapLayerId":${+el.layerID + 1}},"minScale":${el.minScale},"maxScale":${el.maxScale}},`;
        urllMiddle += el.layerID + ",";
      }
    }

    urlParams += "]" + URL_MIDDLE + urllMiddle;
    
    this._layers.next(newLayers); //update components with new status
    this._changed.next(urlParams); // alert the map to update added layers

    console.log('Printing Layers: ', this._layers.getValue());
  }

}
