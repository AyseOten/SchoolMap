import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Info } from './info';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';


const baseUrl = 'http://localhost:5000'

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  host = "http://localhost:5000";
  result = null;
  datas;
  newDatas;

  constructor(private http: HttpClient) { }

  getAllDatas() {
    return this.http.get('http://localhost:5000/info')
  }

  addInfosDatabase(data) {
    console.log("fonkiyona geldimmm")
    console.log("data:"+data)
    this.http.post(baseUrl, data)
    .subscribe ((result) =>{
        console.log("result",this.result);
      })
  }



 
}
