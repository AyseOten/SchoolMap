import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import {Info} from '../info'
import {MapComponent} from '../map/map.component';
import { from } from 'rxjs';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {

  infoList: Info = {locationName:null, adress:null, telephone:null, trueOrFalse:null};

  locationForm = new FormGroup({
    locationName: new FormControl('', Validators.required ),
    adress: new FormControl(''),
    telephone : new FormControl('')
  });

  @Output() newItemE = new EventEmitter<Info>();
  constructor() {}
  ngOnInit(): void {
  }

  onSubmit($event:Event){

    this.infoList.locationName = this.locationForm.get('locationName').value;
    this.infoList.adress = this.locationForm.get('adress').value;
    this.infoList.telephone = this.locationForm.get('telephone').value;
    this.infoList.trueOrFalse = false;
    //this.InfoList.push({'locationName':this.ln,'adress': this.adr,'telephone':this.tel,'trueOrFalse':false});
    console.log(this.infoList);
    this.newItemE.emit(this.infoList);
  }
}
