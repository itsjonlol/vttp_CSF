import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { City } from '../components/models/upload-result';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  //actually call the backeend
  private httpClient = inject(HttpClient);
  constructor() { }

  getCities() {// why need to convert it into a promise?
    return lastValueFrom(this.httpClient.get<City[]>('http://localhost:8080/api/cities'))
    // return lastValueFrom(this.httpClient.get<City[]>('/api/cities'))
  }
}
