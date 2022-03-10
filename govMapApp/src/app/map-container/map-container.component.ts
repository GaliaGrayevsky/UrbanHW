import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { GovMapCommunicatorService } from 'src/app/core/gov-map-communicator.service';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { DataStateManagerService } from '../core/data-state-manager.service';
import { Subscription } from 'rxjs';
import { URL_END } from '../core/models';

declare const JSITM: any; //import the coordinates conversion library

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  private map: any;
  changed: Subscription = new Subscription();

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 32.02444, 34.85771 ],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private updateOverlay(url: string){

    //get view port coordinates
    let mapBounds = this.map.getBounds();
    let nelat = mapBounds._northEast.lat;
    let nelng = mapBounds._northEast.lng;
    let swlat = mapBounds._southWest.lat;
    let swlng = mapBounds._southWest.lng;

    //calculate BBOX coner coordinates
    let bboxUC: string = JSITM.gpsRef2itmRef(nelat + " " + nelng).split(' ').join(',');
    let bboxDC: string = JSITM.gpsRef2itmRef(swlat + " " + swlng).split(' ').join(',');

    var imageUrl = url + `&bbox=${bboxUC},${bboxDC}` + URL_END;
    console.log(imageUrl);
    var imageBounds: L.LatLngBoundsExpression = [[nelat, nelng], [swlat, swlng]];

    L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
  }

  constructor(private govMapCommunicatorService: GovMapCommunicatorService, private dataStateManagerService: DataStateManagerService) { }

  ngOnInit(): void {

      // Subscribe to the displayed layers list chnages to update the overlay accordingly
      this.changed = this.dataStateManagerService.getChanged().subscribe((changed: string) => {
        if (!!changed) {
          console.log('Displayed layers list was changed, update the overlay');
          this.updateOverlay(changed);
        }
      });
  }

  /** Initialize the map after view initiations, since it requires DOM node */
  ngAfterViewInit(): void {

    if (!this.map) {
      this.initMap();
    }

    let mi: any = this;

    this.map.on("moveend", function () {
      console.log('Updating the overlay');
      mi.dataStateManagerService.updateLayerState();
    });
    
  }

  /** Clear the memory and unsbcribie */
  ngOnDestroy(): void {
      this.changed.unsubscribe();
  }
  

}
