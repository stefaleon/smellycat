import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    const map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM({ attributions: [] }),
        }),
      ],
      view: new View({
        center: [22.94316, 40.63433],
        zoom: 13,
        projection: 'EPSG:4326',
      }),
    });

    const markerElement = document.createElement('div');
    markerElement.style.width = '20px';
    markerElement.style.height = '20px';
    markerElement.style.background = 'red';
    markerElement.style.borderRadius = '50%';

    const marker = new Overlay({
      position: fromLonLat([22.94316, 40.63433], 'EPSG:4326'),
      positioning: 'center-center',
      element: markerElement,
      stopEvent: false,
    });

    map.addOverlay(marker);
  }
}
