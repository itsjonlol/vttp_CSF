import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

const MATERIAL = [MatButtonModule,MatCardModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL
  ],
  exports:[
    CommonModule,
    MATERIAL
  ]
})
export class MaterialModule { }
