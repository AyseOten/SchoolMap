import { Component, OnInit, Inject } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalComponent } from '../modal/modal.component';
import { Output, EventEmitter } from '@angular/core';
import {Info} from '../info';
import {Coordinates} from '../coordinates';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import XyzSource from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { InfoService } from '../info.service';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  vectorSource: VectorSource;

  map:Map;
  modal;
  locationName:string;
  adress:string;
  telephone:string;

  datas;
  newDatas = {
    data : [{
      locationName:null,
      adress:null,
      telephone:null,
      geometry: {type:null,coordinates:null}
    }]
  };

  getList:boolean;
  

  trueOrFalse:boolean;

  Coordinate:Coordinates = {coordinate:null, trueOrFalse:null};

  @Output() newItemEvent = new EventEmitter<Coordinates>();
  constructor(private infoService: InfoService) { }

  ngOnInit(): void {
    this.getList = false;
    this.vectorSource = new VectorSource();
    var style1 = [
      new Style({
          image: new Icon({
              scale: .05,
              src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Green_Dot.svg",
         }),
       zIndex: 5,
   }), 
   ];

    this.map = new Map({
      target: 'myMap',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: this.vectorSource,
          style: function(feature, resolution) {
            return style1;
        }
    
        })
      ],
      view: new View({
        center: olProj.fromLonLat([35.24, 38.96]),
        zoom: 6
      })
    });

  }

  getDataFromService() {
    this.getList = true;
    this.infoService.getAllDatas().subscribe((res) => {
      this.datas =  JSON.stringify(res);
      this.newDatas = JSON.parse(this.datas);

      console.log(this.newDatas.data[5].geometry.coordinates);

      for(let i = 0; i < this.newDatas.data.length; i++) {
        var feature = new Feature({
            geometry: new Point(this.newDatas.data[i].geometry.coordinates)    
        });
        this.vectorSource.addFeature(feature);
      }
    });
  }

  getCoord (event: any){
    var coordinate = this.map.getEventCoordinate(event);

    this.Coordinate.coordinate = coordinate;
    this.Coordinate.trueOrFalse = true;

    this.mapWithMarker(coordinate);
    
    this.newItemEvent.emit(this.Coordinate);
 }

  mapWithMarker (coord) {
    var marker = new Feature({
      geometry: new Point(coord),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });

    this.vectorSource.addFeature(marker)
  }

}
