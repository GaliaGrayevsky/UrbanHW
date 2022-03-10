import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ILayerData } from './models';

/**
 * Manages HTTP requests to api servers
 */

@Injectable({
  providedIn: 'root'
})
export class GovMapCommunicatorService {

  public static controller = {
    GET_BASIC_LAYERS: '/getTocLayers',
    GET_ADDITIONAL_LAYESR: '/getAdditionalLayers'
  }


  constructor(private http: HttpClient) { }

  getBasicLayers(): Observable<ILayerData[]> {
    
    return this.http.get<any>(environment.URI_ENDPOINT + GovMapCommunicatorService.controller.GET_BASIC_LAYERS).pipe(
        map((response: any) => {
            return this.getLayersSpecification(response);
        }),
        catchError((fault: HttpErrorResponse) => {
            console.warn(`Getting layers list error ( ${fault.error.message} )`);
            return throwError(fault);
        })
      );
  }

  private getLayersSpecification(data: any): ILayerData[] {

    let layers: ILayerData[] = [];

    let cleanDataObject: any = data['data']['שכבות ממשלה ומוסדות ציבור']['layers'];

    for (let i in cleanDataObject){
      let layer: ILayerData = {        
        layerID:      cleanDataObject[i].layerID,
        layerCaption: cleanDataObject[i].caption,
        layerColor:   cleanDataObject[i].layerIcon.bars,
        selected:     false,
        minScale:     cleanDataObject[i].minScale,
        maxScale:     cleanDataObject[i].maxScale
      }

      layers.push(layer);
    }

    return layers;

  }

}
