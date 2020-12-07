import { Component } from '@angular/core';
import {Coordinates} from '../app/coordinates';
import {Info} from '../app/info';
import {InfoService} from '../app/info.service';

export interface Infos 
{
  coordinates:string;
  locationname:string;
  adress:string;
  telephone:string;

}
const baseUrl = 'http://localhost:5000/info';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OpenlayersWithAngular';
  veri;
  constructor(private infoService: InfoService){
    // this.veri = infoService.datas;
    // console.log('veri' + this.veri);
  }

  ngOnInit(){

  }
  infos: Infos = {
    coordinates : null,
    locationname : null,
    adress : null ,
    telephone : null
}
  trueOrFalse = false;
  
  host = "http://localhost:5000";
  result = null;

  addItem(newItem: Coordinates) {
    console.log(newItem.coordinate);
    this.infos.coordinates = newItem.coordinate;
    console.log("infonun " ,this.infos.coordinates);
    this.trueOrFalse = newItem.trueOrFalse;
  }

  addInfos(newI: Info, infserv:InfoService) {
    this.infos.locationname =  newI.locationName;
    this.infos.adress = newI.adress;
    this.infos.telephone = newI.telephone;
    this.trueOrFalse = newI.trueOrFalse;
    console.log(this.infos);
    this.infoService.addInfosDatabase(this.infos);
  }

  getAllSchools(event:any){ 
    this.infoService.getAllDatas();
  }

  closeModal (){
    this.trueOrFalse = false;
  }
  
}
