import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { WeatherApiResponse, WeatherForecast } from '../../models/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weatherforecast',
  standalone: false,
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css'
})
export class WeatherforecastComponent implements OnInit,OnChanges{
  


  @Input()
  cityName!:string

  weatherService = inject(WeatherService)

  errorMessage!: string;
  errorEncountered:boolean = false;

  
  // ensure initialised
  weatherForecast: WeatherForecast = {
    name: '',
    weather: {
      main: '',
      description: ''
    }
  };
  
  ngOnInit(): void {
    
    this.getWeather()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes...")
    this.getWeather();
  }
  
 

  getWeather() {
    this.weatherService.getWeather(this.cityName).subscribe({
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
}

  
