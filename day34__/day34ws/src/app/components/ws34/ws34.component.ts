import { Component } from '@angular/core';

@Component({
  selector: 'app-ws34',
  standalone: false,
  templateUrl: './ws34.component.html',
  styleUrl: './ws34.component.css'
})
export class Ws34Component {


  city:string=''


  getCity(value:string) {

    this.city = value;
  }
}
