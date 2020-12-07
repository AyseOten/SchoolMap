import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from '../modal/modal.component';

const material = [
  MatButtonModule,
  MatDialogModule
]

@NgModule({
  declarations: [],
  entryComponents:[ModalComponent],
  imports: [
    CommonModule, 
    material
  ],
  exports: [
    CommonModule, 
    material
  ]
})
export class MapModule { }
