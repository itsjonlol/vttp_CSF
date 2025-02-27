import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class FakeryService {


  httpClient= inject(HttpClient)
  constructor() { }


  private apiUrl = "https://jsonfakery.com/photos";

  getFakeryPhotos():Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.apiUrl);
  }
}
