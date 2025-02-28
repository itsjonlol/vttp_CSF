import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherForecast, WeatherApiResponse } from '../../models/models';
import { WeatherService } from '../../service/weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ws35weatherforecast',
  standalone: false,
  templateUrl: './ws35weatherforecast.component.html',
  styleUrl: './ws35weatherforecast.component.css'
})
export class Ws35weatherforecastComponent {

  activatedRoute = inject(ActivatedRoute);

  weatherService = inject(WeatherService);

  
  // @Input({required:true})
  cityName!:string;

  errorMessage!: string;
  errorEncountered:boolean = false;

  weatherSubscription!: Subscription;

  
  // ensure initialised
  weatherForecast: WeatherForecast = {
    name: '',
    weather: {
      main: '',
      description: ''
    }
  };
  
  ngOnInit(): void {
    //if using query
    // this.cityName = this.activatedRoute.snapshot.params['city']

    //if using queryparams
    this.cityName = this.activatedRoute.snapshot.queryParams['cityname']

    console.log(this.cityName)
    this.getWeather()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes...")
    this.getWeather();
  }
  
 

  getWeather() {
    this.weatherSubscription=this.weatherService.getWeather(this.cityName).subscribe({
      next: (response:WeatherApiResponse) => {
        // this.weatherForecast.name = response.name;
        // this.weatherForecast.weather.main = response.weather[0].main
        // this.weatherForecast.weather.description = response.weather[0].description
        this.errorEncountered=false;
        this.weatherForecast = {
          name: response.name,
          weather: {
            main: response.weather[0].main,
            description: response.weather[0].description
          }
        }
      },error: (error:HttpErrorResponse) => {
        this.errorMessage = error.error.message
        this.errorEncountered=true;
      }
    })
  }

  ngOnDestroy() {
    this.weatherSubscription.unsubscribe();
  }
}
