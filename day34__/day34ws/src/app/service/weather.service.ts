import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { WeatherApiResponse, WeatherForecast } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  httpClient = inject(HttpClient)

  weatherAPIKEY = environment.weatherAPIKEY;
  
  // weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${this.weatherAPIKEY}`
  url="https://api.openweathermap.org/data/2.5/weather"


  //otherwise can stick to Observable<any>
  getWeather(cityName: string):Observable<WeatherApiResponse> {
    return this.httpClient.get<WeatherApiResponse>(`${this.url}?q=${cityName}&appid=${this.weatherAPIKEY}`);
  }
}
