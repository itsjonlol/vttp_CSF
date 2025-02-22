import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fruit } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  httpClient = inject(HttpClient);

  private api_url = "http://localhost:3000/products"
  constructor() { }

  public getFruits():Observable<Fruit[]> {
    return this.httpClient.get<Fruit[]>(this.api_url);
  } 
}
