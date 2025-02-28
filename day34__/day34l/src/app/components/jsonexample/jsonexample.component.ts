import { Component, OnInit } from '@angular/core';
import * as jsonData from '../../../../public/countries.json';
import { Country } from '../../model/models';

@Component({
  selector: 'app-jsonexample',
  standalone: false,
  templateUrl: './jsonexample.component.html',
  styleUrl: './jsonexample.component.css'
})
export class JsonexampleComponent implements OnInit{
  data:any = jsonData

  countryData: Country[] = this.data.default

  ngOnInit(): void {
    
  }

}
