import { Component, inject, OnInit } from '@angular/core';
import { CitiesService } from './service/cities.service';
import { CityStore } from './components/store/city.store';
import { City } from './components/models/upload-result';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  cities!: City[]
  private citiesSvc = inject(CitiesService) // talks to the backend
  private citiesStore = inject(CityStore) // componnet store -> state management store, storing a list of cities
  
  


  async ngOnInit() {

    


    this.cities = await this.citiesSvc.getCities(); // pauses the execution
    // the below steps will wait for the above async call first to end
    this.cities.forEach((cityObj)=> {
      console.log(cityObj)
      // this function calls the city
      this.citiesStore.addNewCity(cityObj);
      
    })

    
    

  }
}
