import { environment } from '../../environments/environment';

export interface ILayerData {
    layerID: String,
    layerCaption: string,
    layerColor: string,
    selected: boolean,
    minScale: number,
    maxScale: number
}

export const URL_PREFIX = environment.SERVER_URL + "/https://ags.govmap.gov.il/proxy/proxy.ashx?http://govmap/arcgis/rest/services/AdditionalData/MapServer/export?dynamicLayers=[";
export const URL_MIDDLE = "&dpi=96&transparent=true&format=png32&layers=show:";
export const URL_END = "&bboxSR=2039&imageSR=2039&size=651,754&f=image";