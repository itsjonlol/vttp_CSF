import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-ws35',
  standalone: false,
  templateUrl: './ws35.component.html',
  styleUrl: './ws35.component.css'
})
export class Ws35Component implements OnInit {


  // cities:string[]= ['Singapore','Kuala Lumpur','Tokyo','Bangkok','Hong Kong','Beijing']
  cities:string[]=[]

  ngOnInit(): void {
    
    this.getCitiesFromStorage();
  }

  getCityName(value:string) {
    this.cities = [...this.cities,value]
    this.storeCitiesInStorage(this.cities);
    
  }

  storeCitiesInStorage(cities:string[]):void {
    localStorage.setItem("cities",JSON.stringify(cities));
  }

  getCitiesFromStorage():string[] {
    const storedCities = localStorage.getItem("cities");

    if (storedCities) {
      this.cities = JSON.parse(storedCities)
    }
    return this.cities;
  }

  
}
