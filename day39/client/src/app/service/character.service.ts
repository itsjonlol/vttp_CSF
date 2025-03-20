import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../model/models';




@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  httpClient = inject(HttpClient)

  getCharacters(query:string):Observable<Character[]> {
    return this.httpClient.get<Character[]>(`/api/characters?name=${query}`)
  }
  
}
